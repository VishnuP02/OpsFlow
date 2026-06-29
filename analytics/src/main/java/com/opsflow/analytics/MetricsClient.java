package com.opsflow.analytics;

import com.opsflow.analytics.proto.MetricsProto.MetricsRequest;
import com.opsflow.analytics.proto.MetricsProto.MetricsResponse;
import com.opsflow.analytics.proto.MetricsServiceGrpc;
import io.grpc.ManagedChannel;
import io.grpc.ManagedChannelBuilder;
import io.grpc.stub.StreamObserver;

import java.util.concurrent.CountDownLatch;
import java.util.concurrent.TimeUnit;

/**
 * OpsFlow Analytics Client
 *
 * A Java gRPC client that connects to the OpsFlow gRPC Metrics Server
 * and retrieves real-time workflow statistics. Supports both unary
 * (single snapshot) and server-streaming (live updates) RPC calls.
 */
public class MetricsClient {

    private final ManagedChannel channel;
    private final MetricsServiceGrpc.MetricsServiceBlockingStub blockingStub;
    private final MetricsServiceGrpc.MetricsServiceStub asyncStub;

    public MetricsClient(String host, int port) {
        this.channel = ManagedChannelBuilder
                .forAddress(host, port)
                .usePlaintext()
                .build();

        this.blockingStub = MetricsServiceGrpc.newBlockingStub(channel);
        this.asyncStub    = MetricsServiceGrpc.newStub(channel);
    }

    /**
     * Unary RPC — fetch a single snapshot of workflow metrics.
     */
    public void getMetrics(String clientId) {
        System.out.println("\n── OpsFlow Metrics Snapshot ──────────────────");

        MetricsRequest request = MetricsRequest.newBuilder()
                .setClientId(clientId)
                .build();

        try {
            MetricsResponse response = blockingStub.getMetrics(request);
            printMetrics(response);
        } catch (Exception e) {
            System.err.println("RPC failed: " + e.getMessage());
        }
    }

    /**
     * Server-streaming RPC — receive live metric updates for a set duration.
     */
    public void streamMetrics(String clientId, int durationSeconds) throws InterruptedException {
        System.out.println("\n── OpsFlow Live Metrics Stream (streaming for "
                + durationSeconds + "s) ──");

        CountDownLatch latch = new CountDownLatch(1);

        MetricsRequest request = MetricsRequest.newBuilder()
                .setClientId(clientId)
                .build();

        asyncStub.streamMetrics(request, new StreamObserver<MetricsResponse>() {
            @Override
            public void onNext(MetricsResponse response) {
                printMetrics(response);
            }

            @Override
            public void onError(Throwable t) {
                System.err.println("Stream error: " + t.getMessage());
                latch.countDown();
            }

            @Override
            public void onCompleted() {
                System.out.println("Stream completed.");
                latch.countDown();
            }
        });

        // Wait for the specified duration then shut down
        latch.await(durationSeconds, TimeUnit.SECONDS);
    }

    public void shutdown() throws InterruptedException {
        channel.shutdown().awaitTermination(5, TimeUnit.SECONDS);
    }

    private static void printMetrics(MetricsResponse r) {
        System.out.println("  Timestamp  : " + r.getTimestamp());
        System.out.println("  Total      : " + r.getTotalRequests());
        System.out.println("  Open       : " + r.getOpenRequests());
        System.out.println("  Resolved   : " + r.getResolvedRequests());
        System.out.println("  Urgent     : " + r.getUrgentRequests());
        System.out.println("  Overdue    : " + r.getOverdueRequests());
        System.out.println("──────────────────────────────────────────────");
    }

    public static void main(String[] args) throws InterruptedException {
        String host = System.getenv().getOrDefault("GRPC_HOST", "localhost");
        int    port = Integer.parseInt(
                System.getenv().getOrDefault("GRPC_PORT", "50051"));

        MetricsClient client = new MetricsClient(host, port);

        try {
            // 1. Single snapshot
            client.getMetrics("analytics-client-1");

            // 2. Stream live updates for 30 seconds
            client.streamMetrics("analytics-client-1", 30);
        } finally {
            client.shutdown();
        }
    }
}
