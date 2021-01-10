# Lambda

## Configuration

| Parameter                     | Description | Default                            |
| ---                           | ---         | ---                                |
| replicaCount                  |             | `1`                                |
| strategyType                  | Pod deployment [strategy](https://kubernetes.io/docs/concepts/workloads/controllers/deployment/#strategy) | `RollingUpdate` |
| image.repository              |             | `user/repo` |
| image.tag                     |             | `stable`                           |
| image.pullPolicy              |             | `Always`                           |
| image.secrets                 |             | `[name: registry]`          |
| podAnnotations                | Pod annotations | `{}`                           |
| application.track             |             | `stable`                           |
| application.tier              |             | `web`                              |
| application.migrateCommand    | If present, this variable will run as a shell command within an application Container as a Helm pre-upgrade Hook. Intended to run migration commands. | `nil` |
| application.initializeCommand | If present, this variable will run as shell command within an application Container as a Helm post-install Hook. Intended to run database initialization commands. When set, the Deployment resource will be skipped.| `nil` |
| application.secretName        | Pass in the name of a Secret which the deployment will [load all key-value pairs from the Secret as environment variables](https://kubernetes.io/docs/tasks/configure-pod-container/configure-pod-configmap/#configure-all-key-value-pairs-in-a-configmap-as-container-environment-variables) in the application container. | `nil` |
| application.secretChecksum    | Pass in the checksum of the secrets referenced by `application.secretName`. | `nil` |
| hpa.enabled                   | If true, enables horizontal pod autoscaler. A resource request is also required to be set, such as `resources.requests.cpu: 200m`.| `true` |
| hpa.minReplicas               |             | `1`                                |
| hpa.maxReplicas               |             | `5`                                |
| hpa.targetCPUUtilizationPercentage | Percentage threshold when HPA begins scaling out pods | `80` |
| project.repo                    | project repo. | `nil` |
| project.slug                    | environment slug. | `nil` |
| project.env                | environment name. | `nil` |
| project.url                 | environment url.  | `nil` |
| service.enabled               |             | `true`                             |
| service.annotations           | Service annotations | `{}`                       |
| service.name                  |             | `web`                              |
| service.type                  |             | `ClusterIP`                        |
| service.url                   |             | `http://app.namespace.cluster.local/`              |
| service.additionalHosts       | If present, this list will add additional hostnames to the server configuration. | `nil` |
| service.commonName            | If present, this will define the ssl certificate common name to be used by CertManager. `service.url` and `service.additionalHosts` will be added as Subject Alternative Names (SANs) | `nil` |
| service.externalPort          |             | `5000`                             |
| service.internalPort          |             | `5000`                             |
| ingress.enabled               | If true, enables ingress | `true`                |
| ingress.tls.enabled           | If true, enables SSL | `true`                    |
| ingress.tls.secretName        | Name of the secret used to terminate SSL traffic | `""` |
| ingress.modSecurity.enabled | Enable custom configuration for modsecurity, defaulting to [the Core Rule Set](https://coreruleset.org) | `false` |
| ingress.modSecurity.secRuleEngine | Configuration for [ModSecurity's rule engine](https://github.com/SpiderLabs/ModSecurity/wiki/Reference-Manual-(v2.x)#SecRuleEngine) | `DetectionOnly` |
| ingress.modSecurity.secRules | Configuration for custom [ModSecurity's rules](https://github.com/SpiderLabs/ModSecurity/wiki/Reference-Manual-(v2.x)#secrule) | `nil` |
| ingress.annotations           | Ingress annotations | `{kubernetes.io/ingress.class: "nginx"}` |
| livenessProbe.path            | Path to access on the HTTP server on periodic probe of container liveness. | `/`                                |
| livenessProbe.scheme          | Scheme to access the HTTP server (HTTP or HTTPS). | `HTTP`                                |
| livenessProbe.initialDelaySeconds | # of seconds after the container has started before liveness probes are initiated. | `15`                               |
| livenessProbe.timeoutSeconds  | # of seconds after which the liveness probe times out. | `15`                               |
| livenessProbe.probeType       | Type of [liveness probe](https://kubernetes.io/docs/tasks/configure-pod-container/configure-liveness-readiness-startup-probes) to use. | `httpGet`
| livenessProbe.command         | Commands for use with probe type 'exec'. | `{}`
| readinessProbe.path           | Path to access on the HTTP server on periodic probe of container readiness. | `/`                                |
| readinessProbe.scheme         | Scheme to access the HTTP server (HTTP or HTTPS). | `HTTP`                                |
| readinessProbe.initialDelaySeconds | # of seconds after the container has started before readiness probes are initiated. | `5`                                |
| readinessProbe.timeoutSeconds | # of seconds after which the readiness probe times out. | `3`                                |
| readinessProbe.probeType     | Type of [readiness probe](https://kubernetes.io/docs/tasks/configure-pod-container/configure-liveness-readiness-startup-probes) to use. | `httpGet`
| readinessProbe.command       | Commands for use with probe type 'exec'. | `{}`
| podDisruptionBudget.enabled   |             | `false`                            |
| podDisruptionBudget.maxUnavailable |             | `1`                            |
| podDisruptionBudget.minAvailable | If present, this variable will configure minAvailable in the PodDisruptionBudget. :warning: if you have `replicaCount: 1` and `podDisruptionBudget.minAvailable: 1` `kubectl drain` will be blocked.              | `nil`                            |
| prometheus.metrics            | Annotates the service for prometheus auto-discovery. Also denies access to the `/metrics` endpoint from external addresses with Ingress. | `false` |
| networkPolicy.enabled         | Enable container network policy | `false` |
| networkPolicy.spec            | [Network policy](https://kubernetes.io/docs/concepts/services-networking/network-policies/) definition | `{ podSelector: { matchLabels: {} }, ingress: [{ from: [{ podSelector: { matchLabels: {} } }, { namespaceSelector: { matchLabels: { managed_by: lambda } } }] }] }` |
