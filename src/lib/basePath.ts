/**
 * GitHub Pages 등 저장소 하위 경로(예: /evertreasure-site/)에 배포할 때
 * public/ 폴더의 정적 파일 경로 앞에 붙일 접두사.
 *
 * next.config.mjs 에서 NEXT_PUBLIC_BASE_PATH 값을 빌드 시점에 주입합니다.
 * 루트 도메인에 배포(Vercel, 자체 호스팅 등)할 때는 비워두면 됩니다.
 */
export const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || '';

/** "/assets/..." 같은 절대 경로 앞에 BASE_PATH를 붙여 반환합니다. 외부 URL(http)은 그대로 둡니다. */
export function asset(path: string): string {
  if (!path || path.startsWith('http')) return path;
  return `${BASE_PATH}${path}`;
}
