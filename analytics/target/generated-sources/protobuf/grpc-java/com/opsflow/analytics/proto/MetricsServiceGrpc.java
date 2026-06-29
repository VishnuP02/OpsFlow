package com.opsflow.analytics.proto;

import static io.grpc.MethodDescriptor.generateFullMethodName;

/**
 * <pre>
 * Workflow metrics service — exposes OpsFlow request statistics via gRPC
 * </pre>
 */
@javax.annotation.Generated(
    value = "by gRPC proto compiler (version 1.63.0)",
    comments = "Source: metrics.proto")
@io.grpc.stub.annotations.GrpcGenerated
public final class MetricsServiceGrpc {

  private MetricsServiceGrpc() {}

  public static final java.lang.String SERVICE_NAME = "opsflow.MetricsService";

  // Static method descriptors that strictly reflect the proto.
  private static volatile io.grpc.MethodDescriptor<com.opsflow.analytics.proto.MetricsProto.MetricsRequest,
      com.opsflow.analytics.proto.MetricsProto.MetricsResponse> getGetMetricsMethod;

  @io.grpc.stub.annotations.RpcMethod(
      fullMethodName = SERVICE_NAME + '/' + "GetMetrics",
      requestType = com.opsflow.analytics.proto.MetricsProto.MetricsRequest.class,
      responseType = com.opsflow.analytics.proto.MetricsProto.MetricsResponse.class,
      methodType = io.grpc.MethodDescriptor.MethodType.UNARY)
  public static io.grpc.MethodDescriptor<com.opsflow.analytics.proto.MetricsProto.MetricsRequest,
      com.opsflow.analytics.proto.MetricsProto.MetricsResponse> getGetMetricsMethod() {
    io.grpc.MethodDescriptor<com.opsflow.analytics.proto.MetricsProto.MetricsRequest, com.opsflow.analytics.proto.MetricsProto.MetricsResponse> getGetMetricsMethod;
    if ((getGetMetricsMethod = MetricsServiceGrpc.getGetMetricsMethod) == null) {
      synchronized (MetricsServiceGrpc.class) {
        if ((getGetMetricsMethod = MetricsServiceGrpc.getGetMetricsMethod) == null) {
          MetricsServiceGrpc.getGetMetricsMethod = getGetMetricsMethod =
              io.grpc.MethodDescriptor.<com.opsflow.analytics.proto.MetricsProto.MetricsRequest, com.opsflow.analytics.proto.MetricsProto.MetricsResponse>newBuilder()
              .setType(io.grpc.MethodDescriptor.MethodType.UNARY)
              .setFullMethodName(generateFullMethodName(SERVICE_NAME, "GetMetrics"))
              .setSampledToLocalTracing(true)
              .setRequestMarshaller(io.grpc.protobuf.ProtoUtils.marshaller(
                  com.opsflow.analytics.proto.MetricsProto.MetricsRequest.getDefaultInstance()))
              .setResponseMarshaller(io.grpc.protobuf.ProtoUtils.marshaller(
                  com.opsflow.analytics.proto.MetricsProto.MetricsResponse.getDefaultInstance()))
              .setSchemaDescriptor(new MetricsServiceMethodDescriptorSupplier("GetMetrics"))
              .build();
        }
      }
    }
    return getGetMetricsMethod;
  }

  private static volatile io.grpc.MethodDescriptor<com.opsflow.analytics.proto.MetricsProto.MetricsRequest,
      com.opsflow.analytics.proto.MetricsProto.MetricsResponse> getStreamMetricsMethod;

  @io.grpc.stub.annotations.RpcMethod(
      fullMethodName = SERVICE_NAME + '/' + "StreamMetrics",
      requestType = com.opsflow.analytics.proto.MetricsProto.MetricsRequest.class,
      responseType = com.opsflow.analytics.proto.MetricsProto.MetricsResponse.class,
      methodType = io.grpc.MethodDescriptor.MethodType.SERVER_STREAMING)
  public static io.grpc.MethodDescriptor<com.opsflow.analytics.proto.MetricsProto.MetricsRequest,
      com.opsflow.analytics.proto.MetricsProto.MetricsResponse> getStreamMetricsMethod() {
    io.grpc.MethodDescriptor<com.opsflow.analytics.proto.MetricsProto.MetricsRequest, com.opsflow.analytics.proto.MetricsProto.MetricsResponse> getStreamMetricsMethod;
    if ((getStreamMetricsMethod = MetricsServiceGrpc.getStreamMetricsMethod) == null) {
      synchronized (MetricsServiceGrpc.class) {
        if ((getStreamMetricsMethod = MetricsServiceGrpc.getStreamMetricsMethod) == null) {
          MetricsServiceGrpc.getStreamMetricsMethod = getStreamMetricsMethod =
              io.grpc.MethodDescriptor.<com.opsflow.analytics.proto.MetricsProto.MetricsRequest, com.opsflow.analytics.proto.MetricsProto.MetricsResponse>newBuilder()
              .setType(io.grpc.MethodDescriptor.MethodType.SERVER_STREAMING)
              .setFullMethodName(generateFullMethodName(SERVICE_NAME, "StreamMetrics"))
              .setSampledToLocalTracing(true)
              .setRequestMarshaller(io.grpc.protobuf.ProtoUtils.marshaller(
                  com.opsflow.analytics.proto.MetricsProto.MetricsRequest.getDefaultInstance()))
              .setResponseMarshaller(io.grpc.protobuf.ProtoUtils.marshaller(
                  com.opsflow.analytics.proto.MetricsProto.MetricsResponse.getDefaultInstance()))
              .setSchemaDescriptor(new MetricsServiceMethodDescriptorSupplier("StreamMetrics"))
              .build();
        }
      }
    }
    return getStreamMetricsMethod;
  }

  /**
   * Creates a new async stub that supports all call types for the service
   */
  public static MetricsServiceStub newStub(io.grpc.Channel channel) {
    io.grpc.stub.AbstractStub.StubFactory<MetricsServiceStub> factory =
      new io.grpc.stub.AbstractStub.StubFactory<MetricsServiceStub>() {
        @java.lang.Override
        public MetricsServiceStub newStub(io.grpc.Channel channel, io.grpc.CallOptions callOptions) {
          return new MetricsServiceStub(channel, callOptions);
        }
      };
    return MetricsServiceStub.newStub(factory, channel);
  }

  /**
   * Creates a new blocking-style stub that supports unary and streaming output calls on the service
   */
  public static MetricsServiceBlockingStub newBlockingStub(
      io.grpc.Channel channel) {
    io.grpc.stub.AbstractStub.StubFactory<MetricsServiceBlockingStub> factory =
      new io.grpc.stub.AbstractStub.StubFactory<MetricsServiceBlockingStub>() {
        @java.lang.Override
        public MetricsServiceBlockingStub newStub(io.grpc.Channel channel, io.grpc.CallOptions callOptions) {
          return new MetricsServiceBlockingStub(channel, callOptions);
        }
      };
    return MetricsServiceBlockingStub.newStub(factory, channel);
  }

  /**
   * Creates a new ListenableFuture-style stub that supports unary calls on the service
   */
  public static MetricsServiceFutureStub newFutureStub(
      io.grpc.Channel channel) {
    io.grpc.stub.AbstractStub.StubFactory<MetricsServiceFutureStub> factory =
      new io.grpc.stub.AbstractStub.StubFactory<MetricsServiceFutureStub>() {
        @java.lang.Override
        public MetricsServiceFutureStub newStub(io.grpc.Channel channel, io.grpc.CallOptions callOptions) {
          return new MetricsServiceFutureStub(channel, callOptions);
        }
      };
    return MetricsServiceFutureStub.newStub(factory, channel);
  }

  /**
   * <pre>
   * Workflow metrics service — exposes OpsFlow request statistics via gRPC
   * </pre>
   */
  public interface AsyncService {

    /**
     * <pre>
     * Returns a snapshot of current workflow metrics
     * </pre>
     */
    default void getMetrics(com.opsflow.analytics.proto.MetricsProto.MetricsRequest request,
        io.grpc.stub.StreamObserver<com.opsflow.analytics.proto.MetricsProto.MetricsResponse> responseObserver) {
      io.grpc.stub.ServerCalls.asyncUnimplementedUnaryCall(getGetMetricsMethod(), responseObserver);
    }

    /**
     * <pre>
     * Streams live workflow metric updates every 5 seconds
     * </pre>
     */
    default void streamMetrics(com.opsflow.analytics.proto.MetricsProto.MetricsRequest request,
        io.grpc.stub.StreamObserver<com.opsflow.analytics.proto.MetricsProto.MetricsResponse> responseObserver) {
      io.grpc.stub.ServerCalls.asyncUnimplementedUnaryCall(getStreamMetricsMethod(), responseObserver);
    }
  }

  /**
   * Base class for the server implementation of the service MetricsService.
   * <pre>
   * Workflow metrics service — exposes OpsFlow request statistics via gRPC
   * </pre>
   */
  public static abstract class MetricsServiceImplBase
      implements io.grpc.BindableService, AsyncService {

    @java.lang.Override public final io.grpc.ServerServiceDefinition bindService() {
      return MetricsServiceGrpc.bindService(this);
    }
  }

  /**
   * A stub to allow clients to do asynchronous rpc calls to service MetricsService.
   * <pre>
   * Workflow metrics service — exposes OpsFlow request statistics via gRPC
   * </pre>
   */
  public static final class MetricsServiceStub
      extends io.grpc.stub.AbstractAsyncStub<MetricsServiceStub> {
    private MetricsServiceStub(
        io.grpc.Channel channel, io.grpc.CallOptions callOptions) {
      super(channel, callOptions);
    }

    @java.lang.Override
    protected MetricsServiceStub build(
        io.grpc.Channel channel, io.grpc.CallOptions callOptions) {
      return new MetricsServiceStub(channel, callOptions);
    }

    /**
     * <pre>
     * Returns a snapshot of current workflow metrics
     * </pre>
     */
    public void getMetrics(com.opsflow.analytics.proto.MetricsProto.MetricsRequest request,
        io.grpc.stub.StreamObserver<com.opsflow.analytics.proto.MetricsProto.MetricsResponse> responseObserver) {
      io.grpc.stub.ClientCalls.asyncUnaryCall(
          getChannel().newCall(getGetMetricsMethod(), getCallOptions()), request, responseObserver);
    }

    /**
     * <pre>
     * Streams live workflow metric updates every 5 seconds
     * </pre>
     */
    public void streamMetrics(com.opsflow.analytics.proto.MetricsProto.MetricsRequest request,
        io.grpc.stub.StreamObserver<com.opsflow.analytics.proto.MetricsProto.MetricsResponse> responseObserver) {
      io.grpc.stub.ClientCalls.asyncServerStreamingCall(
          getChannel().newCall(getStreamMetricsMethod(), getCallOptions()), request, responseObserver);
    }
  }

  /**
   * A stub to allow clients to do synchronous rpc calls to service MetricsService.
   * <pre>
   * Workflow metrics service — exposes OpsFlow request statistics via gRPC
   * </pre>
   */
  public static final class MetricsServiceBlockingStub
      extends io.grpc.stub.AbstractBlockingStub<MetricsServiceBlockingStub> {
    private MetricsServiceBlockingStub(
        io.grpc.Channel channel, io.grpc.CallOptions callOptions) {
      super(channel, callOptions);
    }

    @java.lang.Override
    protected MetricsServiceBlockingStub build(
        io.grpc.Channel channel, io.grpc.CallOptions callOptions) {
      return new MetricsServiceBlockingStub(channel, callOptions);
    }

    /**
     * <pre>
     * Returns a snapshot of current workflow metrics
     * </pre>
     */
    public com.opsflow.analytics.proto.MetricsProto.MetricsResponse getMetrics(com.opsflow.analytics.proto.MetricsProto.MetricsRequest request) {
      return io.grpc.stub.ClientCalls.blockingUnaryCall(
          getChannel(), getGetMetricsMethod(), getCallOptions(), request);
    }

    /**
     * <pre>
     * Streams live workflow metric updates every 5 seconds
     * </pre>
     */
    public java.util.Iterator<com.opsflow.analytics.proto.MetricsProto.MetricsResponse> streamMetrics(
        com.opsflow.analytics.proto.MetricsProto.MetricsRequest request) {
      return io.grpc.stub.ClientCalls.blockingServerStreamingCall(
          getChannel(), getStreamMetricsMethod(), getCallOptions(), request);
    }
  }

  /**
   * A stub to allow clients to do ListenableFuture-style rpc calls to service MetricsService.
   * <pre>
   * Workflow metrics service — exposes OpsFlow request statistics via gRPC
   * </pre>
   */
  public static final class MetricsServiceFutureStub
      extends io.grpc.stub.AbstractFutureStub<MetricsServiceFutureStub> {
    private MetricsServiceFutureStub(
        io.grpc.Channel channel, io.grpc.CallOptions callOptions) {
      super(channel, callOptions);
    }

    @java.lang.Override
    protected MetricsServiceFutureStub build(
        io.grpc.Channel channel, io.grpc.CallOptions callOptions) {
      return new MetricsServiceFutureStub(channel, callOptions);
    }

    /**
     * <pre>
     * Returns a snapshot of current workflow metrics
     * </pre>
     */
    public com.google.common.util.concurrent.ListenableFuture<com.opsflow.analytics.proto.MetricsProto.MetricsResponse> getMetrics(
        com.opsflow.analytics.proto.MetricsProto.MetricsRequest request) {
      return io.grpc.stub.ClientCalls.futureUnaryCall(
          getChannel().newCall(getGetMetricsMethod(), getCallOptions()), request);
    }
  }

  private static final int METHODID_GET_METRICS = 0;
  private static final int METHODID_STREAM_METRICS = 1;

  private static final class MethodHandlers<Req, Resp> implements
      io.grpc.stub.ServerCalls.UnaryMethod<Req, Resp>,
      io.grpc.stub.ServerCalls.ServerStreamingMethod<Req, Resp>,
      io.grpc.stub.ServerCalls.ClientStreamingMethod<Req, Resp>,
      io.grpc.stub.ServerCalls.BidiStreamingMethod<Req, Resp> {
    private final AsyncService serviceImpl;
    private final int methodId;

    MethodHandlers(AsyncService serviceImpl, int methodId) {
      this.serviceImpl = serviceImpl;
      this.methodId = methodId;
    }

    @java.lang.Override
    @java.lang.SuppressWarnings("unchecked")
    public void invoke(Req request, io.grpc.stub.StreamObserver<Resp> responseObserver) {
      switch (methodId) {
        case METHODID_GET_METRICS:
          serviceImpl.getMetrics((com.opsflow.analytics.proto.MetricsProto.MetricsRequest) request,
              (io.grpc.stub.StreamObserver<com.opsflow.analytics.proto.MetricsProto.MetricsResponse>) responseObserver);
          break;
        case METHODID_STREAM_METRICS:
          serviceImpl.streamMetrics((com.opsflow.analytics.proto.MetricsProto.MetricsRequest) request,
              (io.grpc.stub.StreamObserver<com.opsflow.analytics.proto.MetricsProto.MetricsResponse>) responseObserver);
          break;
        default:
          throw new AssertionError();
      }
    }

    @java.lang.Override
    @java.lang.SuppressWarnings("unchecked")
    public io.grpc.stub.StreamObserver<Req> invoke(
        io.grpc.stub.StreamObserver<Resp> responseObserver) {
      switch (methodId) {
        default:
          throw new AssertionError();
      }
    }
  }

  public static final io.grpc.ServerServiceDefinition bindService(AsyncService service) {
    return io.grpc.ServerServiceDefinition.builder(getServiceDescriptor())
        .addMethod(
          getGetMetricsMethod(),
          io.grpc.stub.ServerCalls.asyncUnaryCall(
            new MethodHandlers<
              com.opsflow.analytics.proto.MetricsProto.MetricsRequest,
              com.opsflow.analytics.proto.MetricsProto.MetricsResponse>(
                service, METHODID_GET_METRICS)))
        .addMethod(
          getStreamMetricsMethod(),
          io.grpc.stub.ServerCalls.asyncServerStreamingCall(
            new MethodHandlers<
              com.opsflow.analytics.proto.MetricsProto.MetricsRequest,
              com.opsflow.analytics.proto.MetricsProto.MetricsResponse>(
                service, METHODID_STREAM_METRICS)))
        .build();
  }

  private static abstract class MetricsServiceBaseDescriptorSupplier
      implements io.grpc.protobuf.ProtoFileDescriptorSupplier, io.grpc.protobuf.ProtoServiceDescriptorSupplier {
    MetricsServiceBaseDescriptorSupplier() {}

    @java.lang.Override
    public com.google.protobuf.Descriptors.FileDescriptor getFileDescriptor() {
      return com.opsflow.analytics.proto.MetricsProto.getDescriptor();
    }

    @java.lang.Override
    public com.google.protobuf.Descriptors.ServiceDescriptor getServiceDescriptor() {
      return getFileDescriptor().findServiceByName("MetricsService");
    }
  }

  private static final class MetricsServiceFileDescriptorSupplier
      extends MetricsServiceBaseDescriptorSupplier {
    MetricsServiceFileDescriptorSupplier() {}
  }

  private static final class MetricsServiceMethodDescriptorSupplier
      extends MetricsServiceBaseDescriptorSupplier
      implements io.grpc.protobuf.ProtoMethodDescriptorSupplier {
    private final java.lang.String methodName;

    MetricsServiceMethodDescriptorSupplier(java.lang.String methodName) {
      this.methodName = methodName;
    }

    @java.lang.Override
    public com.google.protobuf.Descriptors.MethodDescriptor getMethodDescriptor() {
      return getServiceDescriptor().findMethodByName(methodName);
    }
  }

  private static volatile io.grpc.ServiceDescriptor serviceDescriptor;

  public static io.grpc.ServiceDescriptor getServiceDescriptor() {
    io.grpc.ServiceDescriptor result = serviceDescriptor;
    if (result == null) {
      synchronized (MetricsServiceGrpc.class) {
        result = serviceDescriptor;
        if (result == null) {
          serviceDescriptor = result = io.grpc.ServiceDescriptor.newBuilder(SERVICE_NAME)
              .setSchemaDescriptor(new MetricsServiceFileDescriptorSupplier())
              .addMethod(getGetMetricsMethod())
              .addMethod(getStreamMetricsMethod())
              .build();
        }
      }
    }
    return result;
  }
}
