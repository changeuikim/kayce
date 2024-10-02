---
title: '백엔드 개발자로서 신규 론칭되는 서비스의 인프라를 구축한 후기'
date: '2024-10-02 14:34'
author: 'kayce'
tags: ['project', 'infra', 'aws', 'provisioning']
---

## 인프라 구축

신규 론칭되는 서비스에 백엔드 개발자로 참여하면서 동시에 AWS에 인프라를 구축하는 역할을 맡았습니다. 이번 포스트에서는 인프라 프로비저닝은 무엇인지, 그리고 어떠한 AWS 서비스를 사용하여 인프라를 구축하였는지에 대해 기술하겠습니다.

## 프로비저닝 (Provisioning)

> 프로비저닝은 IT 인프라를 생성하고 설정하는 프로세스로서, 비즈니스 요구에 맞게 시스템, 데이터, 소프트웨어를 준비하고 설정하는 과정입니다.

AWS는 클라우드 서비스 제공 업체로서, 사용자가 필요한 인프라를 프로비저닝 할 수 있는 다양한 도구와 서비스를 제공합니다. 제가 프로젝트에서 주로 사용하는 클라우드 리소스는 EC2, RDS, S3 등이 있습니다. 이러한 리소스를 사용하여 애플리케이션을 올바르게 배포하기 위해서는 VPC, 서브넷, 라우터, 보안정책 등의 구성 요소를 설정하는 네트워크 프로비저닝이 필요합니다.

## Amazon Elastic Compute Cloud (EC2)

![Arch_Amazon-EC2_48](../../../public/static/images/restrospective/infra-provisioning/Arch_Amazon-EC2_48.png)

> EC2 인스턴스는 AWS에서 제공하는 가상 서버로, 인스턴스 유형마다 서로 다른 컴퓨팅, 메모리, 네트워크 및 스토리지 리소스를 제공합니다.

- 이번 프로젝트에서는 EC2 내에 Spring Boot 애플리케이션과 Next.js 애플리케이션을 배포하여 BE 서버와 FE 서버를 구성했습니다.
- 서버 배포용 EC2 인스턴스는 프라이빗 서브넷에 배치해 보안을 강화하고, Bastion 용도의 EC2 인스턴스를 퍼블릭 서브넷에 배치하여 SSH Tunneling을 통해 접속할 수 있도록 구성했습니다.

## Amazon Relational Database Service (RDS)

![Arch_Amazon-RDS_48](../../../public/static/images/restrospective/infra-provisioning/Arch_Amazon-RDS_48.png)

> RDS는 AWS에서 관계형 데이터베이스를 더 쉽게 설치, 운영 및 확장할 수 있도록 지원하는 서비스입니다.

- MySQL, PostgreSQL 등 다양한 데이터베이스 엔진을 이용할 수 있었지만, 프로젝트 요구사항을 고려하여 조회 성능이 중요한 MySQL 데이터베이스를 사용했습니다.
- RDS 데이터베이스는 프라이빗 서브넷에 배치하여 보안을 강화하고, API 서버와 동일하게 Bastion을 통해 SSH 통신이 가능하도록 구성했습니다.

## Amazon Simple Storage Service (S3)

![Arch_Amazon-Simple-Storage-Service_48](../../../public/static/images/restrospective/infra-provisioning/Arch_Amazon-Simple-Storage-Service_48.png)

> S3는 AWS에서 제공하는 객체 스토리지 서비스로, 데이터를 저장하고 검색할 수 있는 안전하고 확장 가능한 저장소입니다.

- S3 버킷에는 Cloud Formation으로 생성된 스택 템플릿 파일이나 Cloud Front에 배포한 정적 파일 등 다양한 데이터를 저장했습니다.
- S3 객체에 대한 액세스를 제어하여 Presigned URL을 생성해 이미지를 업로드하고 CDN을 통해 이미지를 배포하는 작업을 수행했습니다.

## AWS Cloud Front

![Arch_Amazon-CloudFront_48](../../../public/static/images/restrospective/infra-provisioning/Arch_Amazon-CloudFront_48.png)

> Cloud Front는 AWS에서 제공하는 글로벌 콘텐츠 전송 네트워크(CDN) 서비스로, 사용자에게 빠르고 안정적인 콘텐츠 전송을 제공합니다.

- React 애플리케이션을 CSR 렌더링으로 정적 배포하기 위해 Cloud Front를 사용했습니다.
- Cloud Front를 통해 S3 버킷에 저장된 이미지를 캐싱하고, 사용자에게 빠르게 전달할 수 있도록 구성했습니다.

## AWS Identity and Access Management (IAM)

![Arch_AWS-Identity-and-Access-Management_48](../../../public/static/images/restrospective/infra-provisioning/Arch_AWS-Identity-and-Access-Management_48.png)

> IAM은 AWS에서 제공하는 사용자 및 권한 관리 서비스로, AWS 리소스에 대한 액세스를 안전하게 제어할 수 있습니다.

- IAM을 사용하여 프로젝트에 참여하는 팀원의 역할에 따라 AWS 리소스에 대한 권한을 관리하고, 보안을 강화했습니다.
- Presigned URL을 생성할 수 있도록 S3 버킷에 대한 PutObject 권한을 가진 IAM 사용자를 생성하였습니다.

## AWS Virtual Private Cloud (VPC)

![Arch_Amazon-Virtual-Private-Cloud_48](../../../public/static/images/restrospective/infra-provisioning/Arch_Amazon-Virtual-Private-Cloud_48.png)

> VPC는 사용자가 정의한 가상 네트워크 내에서 AWS 리소스를 시작할 수 있는 서비스입니다.

- 프로젝트에서 사용하는 모든 AWS 리소스를 배치할 네트워크 환경을 정의하고, 서브넷, 라우팅 테이블, 보안 그룹 등을 설정했습니다.
- VPC 내에 프라이빗 서브넷과 퍼블릭 서브넷을 구성하여 보안을 강화하고, Bastion을 통해 SSH 통신이 가능하도록 구성했습니다.

## AWS Route 53

![Arch_Amazon-Route-53_48](../../../public/static/images/restrospective/infra-provisioning/Arch_Amazon-Route-53_48.png)

> Route 53은 AWS에서 제공하는 DNS(Domain Name System) 웹 서비스로, 도메인 이름을 등록하고 관리할 수 있습니다.

- 외부 서비스인 가비아에서 구매한 도메인을 Route 53에 등록하고, API 서버와 클라이언트 서버에 대한 DNS 레코드를 설정했습니다.
- ACM에서 발급받은 SSL/TLS 인증서를 Route 53에 연결하여 HTTPS 프로토콜을 사용할 수 있도록 구성했습니다.

## AWS Certificate Manager (ACM)

![Arch_AWS-Certificate-Manager_48](../../../public/static/images/restrospective/infra-provisioning/Arch_AWS-Certificate-Manager_48.png)

> ACM은 AWS에서 제공하는 SSL/TLS 디지털 인증서 관리 서비스로, 웹사이트 또는 애플리케이션을 안전하게 암호화할 수 있습니다.

- ACM을 사용하여 도메인에 대한 SSL/TLS 인증서를 발급받고, Route 53에 연결하여 HTTPS 프로토콜을 사용할 수 있도록 구성했습니다.
- Cloud Front의 스택을 생성하기 위해 버지니아 북부 리전에서도 SSL/TLS 인증서를 발급받았습니다.

## AWS Cloud Formation

![Arch_AWS-CloudFormation_48](../../../public/static/images/restrospective/infra-provisioning/Arch_AWS-CloudFormation_48.png)

> Cloud Formation은 AWS에서 제공하는 인프라스트럭처를 코드로 관리할 수 있는 서비스로, JSON 또는 YAML 형식의 템플릿 파일을 사용하여 인프라를 프로비저닝할 수 있습니다.

- Cloud Formation을 사용하여 인프라를 코드로 관리하고, 스택 템플릿 파일을 통해 인프라를 프로비저닝했습니다.
- CodePipeline과 연동하여 CI/CD 파이프라인을 구축하고, 인프라 변경 사항을 자동으로 배포할 수 있도록 설정했습니다.

## AWS Code Pipeline

![Arch_AWS-CodePipeline_48](../../../public/static/images/restrospective/infra-provisioning/Arch_AWS-CodePipeline_48.png)

> Code Pipeline은 AWS에서 제공하는 지속적 통합 및 지속적 배포(CI/CD) 서비스로, 소프트웨어 변경 사항을 자동으로 빌드, 테스트 및 배포할 수 있습니다.

- 각 프로젝트의 브랜치에 대한 CI/CD 파이프라인을 구축하고, Cloud Watch를 통해 로그를 모니터링하고 알림을 설정했습니다.
- 디렉토리 구조 및 환경변수의 변화에 대응하기 위해 buildspec 및 script 파일을 수정하고 파라미터 스토어의 환경변수를 관리했습니다.

## AWS Systems Manager

![Arch_AWS-Systems-Manager_48](../../../public/static/images/restrospective/infra-provisioning/Arch_AWS-Systems-Manager_48.png)

> Systems Manager는 AWS에서 제공하는 인프라 관리 서비스로, 인스턴스, 서버, 가상 머신 등을 관리하고 자동화할 수 있습니다.

- Cloud Watch를 통해 인스턴스의 모니터링 및 로그 수집을 설정했습니다.
- 파라미터 스토어를 사용하여 환경변수를 관리하고, 인스턴스에 대한 자동화된 작업을 설정했습니다.

## AWS Budgets

![Arch_AWS-Budgets_48](../../../public/static/images/restrospective/infra-provisioning/Arch_AWS-Budgets_48.png)

> Budgets는 AWS에서 제공하는 비용 관리 서비스로, 예산을 설정하고 비용을 모니터링할 수 있습니다.

- 프로젝트의 예산을 설정하고, 비용을 모니터링하여 예산을 초과하는 경우 알림을 설정했습니다.
