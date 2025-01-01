# Vercel 및 Oracle에 배포하는 블로그의 포스트를 저장하는 저장소

## Vercel 블로그

Vercel의 자동 CI/CD 기능을 사용해서 Next 15와 React 19를 활용하는 블로그 애플리케이션을 배포합니다. Next의 SSG와 RemoteMDX 라이브러리를 사용하여 MDX 포스트를 정적으로 빌드합니다.

## Oracle 블로그

Oracle Cloud Infrastructure에서 제공하는 영구 프리티어 리소스를 활용해서 Next, Spring, RDBMS를 사용하는 블로그 애플리케이션을 배포합니다. Packer와 Terraform을 사용해서 인프라를 프로비저닝하고, 내부 CI/CD 파이프라인을 통해서 비즈니스 로직을 수행하는 애플리케이션을 배포합니다.
