import os from 'os';
import cluster from 'cluster';

export default function runInCluster(bootstrap: () => Promise<void>) {
  const numberOfCores = os.cpus().length;

  if (cluster.isPrimary) {
    for (let i = 0; i < numberOfCores; i++) {
      cluster.fork();
    }
  } else {
    bootstrap();
  }
}
