# WiFi QR 코드 생성기 구현 계획

## 프로젝트 개요

- 사용자가 WiFi 네트워크 정보를 입력하면 QR 코드를 생성해주는 웹 애플리케이션
- Next.js 기반으로 구현
- Shadcn UI 컴포넌트 활용

## 기술 스택

- **프론트엔드**: Next.js, TypeScript, Tailwind CSS
- **UI 컴포넌트**: Shadcn UI
- **QR 코드 생성**: qrcode.react 라이브러리 활용

## 구현 단계

### 1. 프로젝트 구조 설정

- `/app/wifi` 경로에 페이지 컴포넌트 생성
- 필요한 UI 컴포넌트 설치 (Form, Input, Button 등)
- QR 코드 생성 라이브러리 설치

### 2. WiFi 정보 입력 폼 구현

- 다음 정보를 입력받는 폼 구현:
  - SSID (네트워크 이름)
  - 비밀번호
  - 보안 유형 (WPA/WPA2, WEP, None)
  - 숨겨진 네트워크 여부

### 3. QR 코드 생성 기능 구현

- WiFi 정보를 기반으로 QR 코드 생성 로직 작성
- WiFi 연결 정보 문자열 포맷팅: `WIFI:S:<SSID>;T:<Security Type>;P:<Password>;H:<Hidden>;;`
- 생성된 QR 코드 표시 영역 구현

### 4. 추가 기능 구현

- QR 코드 이미지 다운로드 기능
- 생성된 QR 코드 공유 기능 (링크 또는 이미지)
- 모바일 반응형 디자인

### 5. 테스트 및 최적화

- 다양한 WiFi 설정으로 테스트
- 모바일/태블릿/데스크탑 화면에서 UI 테스트
- 성능 최적화

## 구현 계획 상세

### 페이지 구조

1. `/app/wifi/page.tsx` - WiFi QR 코드 생성기 메인 페이지
2. `/components/wifi-form.tsx` - WiFi 정보 입력 폼 컴포넌트
3. `/components/qr-display.tsx` - 생성된 QR 코드 표시 컴포넌트

### 필요한 Shadcn 컴포넌트

```bash
npx shadcn@latest add form
npx shadcn@latest add input
npx shadcn@latest add select
npx shadcn@latest add button
npx shadcn@latest add checkbox
npx shadcn@latest add card
```

### 추가 패키지

```bash
npm install qrcode.react
npm install file-saver
```

## 구현 일정

1. 프로젝트 구조 설정 및 기본 컴포넌트 설치 - 1일
2. WiFi 정보 입력 폼 구현 - 1일
3. QR 코드 생성 및 표시 기능 구현 - 1일
4. 추가 기능 구현 - 1일
5. 테스트 및 최적화 - 1일

총 예상 구현 기간: 5일
