/** 페이지 전체 배경: 구름 이미지 + 비디오 오버레이. (원본 Body Background 이식) */

import { asset } from '@/lib/basePath';

export default function BodyBackground() {
  return (
    <div className="body-background">
      <div className="bg-item">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img loading="lazy" width={1440} height={900} src={asset('/assets/images/item/cloud-bg.png')} alt="Image" />
      </div>
      <div className="bg-video video-dark">
        <video className="video" muted autoPlay loop playsInline>
          <source src={asset('/assets/images/overlay-2.mp4')} type="video/mp4" />
        </video>
        <div className="overlay-1"></div>
      </div>
    </div>
  );
}
