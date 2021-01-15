FROM registry.gitlab.com/gitlab-org/cluster-integration/auto-deploy-image:v2.1.0

COPY --from=mikefarah/yq:4.3.2 /usr/bin/yq /bin

LABEL org.opencontainers.image.source="https://github.com/opencloudengineer/lambda" \
      description="Image for deploying an app using lambda helm chart" \
      maintainer="Siddharth Tiwari <serverlessengineer@gmail.com>"

COPY chart assets
COPY auto-deploy build/bin