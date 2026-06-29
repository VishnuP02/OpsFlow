# ---- Build Stage ----
FROM maven:3.9-eclipse-temurin-21 AS builder

WORKDIR /app

COPY pom.xml .
RUN mvn dependency:go-offline -q

COPY src ./src
RUN mvn package -DskipTests -q

# ---- Runtime Stage ----
FROM eclipse-temurin:21-jre-alpine

WORKDIR /app

RUN addgroup -S appgroup && adduser -S appuser -G appgroup

COPY --from=builder /app/target/analytics-1.0.0.jar app.jar

RUN chown appuser:appgroup app.jar
USER appuser

ENV GRPC_HOST=opsflow_server
ENV GRPC_PORT=50051

CMD ["java", "-jar", "app.jar"]
