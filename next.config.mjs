// GitHub Pages처럼 저장소 하위 경로(예: /evertreasure-site)에 배포할 때 설정합니다.
// .github/workflows/deploy-pages.yml 에서 빌드 시 자동으로 넘겨줍니다.
// 루트 도메인 배포(Vercel, 자체 호스팅)에서는 비어 있어 영향이 없습니다.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

/** @type {import('next').NextConfig} */
const nextConfig = {
  // 정적 사이트로 내보내기: `npm run build` 실행 시 out/ 폴더에 순수 HTML/CSS/JS가 생성됩니다.
  // 생성된 out/ 폴더를 아무 정적 호스팅(닷홈, 카페24, S3, Netlify, Vercel 등)에 올리면 됩니다.
  output: 'export',
  // 정적 export에서는 Next.js 이미지 최적화 서버를 쓸 수 없으므로 비활성화합니다.
  images: { unoptimized: true },
  // 폴더 단위 URL(/about/ 형태)로 내보내 정적 서버 호환성을 높입니다.
  trailingSlash: true,
  basePath: basePath || undefined,
  env: { NEXT_PUBLIC_BASE_PATH: basePath },
};

export default nextConfig;
