# k6-jenkins-example

An example testing using k6

- [k6 load testing](https://k6.io/blog/integrating-load-testing-with-jenkins/)

## Getting Started

```sh
> brew install k6
> export K6_API_TOKEN=xxx
> export K6_CLOUD_PROJECT_ID=xxx
> k6 login cloud --token ${K6_API_TOKEN}
> k6 cloud loadtests/performance-test.js
```

## LICENSE

MIT
