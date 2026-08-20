import Preloader from '@/components/Preloader';
import BodyBackground from '@/components/BodyBackground';
import MobileMenu from '@/components/MobileMenu';
import SidebarTools from '@/components/SidebarTools';
import HeaderBar from '@/components/HeaderBar';
import SidebarUser from '@/components/SidebarUser';
import AboutSection from '@/components/sections/AboutSection';
import WorkSection from '@/components/sections/WorkSection';
import InvestmentSection from '@/components/sections/InvestmentSection';
import PartnersSection from '@/components/sections/PartnersSection';
import ContactSection from '@/components/sections/ContactSection';
import Footer from '@/components/Footer';
import EffectsManager from '@/components/EffectsManager';

export default function Home() {
  return (
    <>
      <Preloader />
      <BodyBackground />
      <MobileMenu />
      <SidebarTools />

      <main id="wrapper">
        <HeaderBar />
        <SidebarUser />

        <div className="main-content">
          <div className="container">
            <div className="row">
              <div className="col-lg-7 col-xl-8 ms-auto">
                <div className="wrap-container">
                  {/* 원본 HTML은 #about div가 닫히지 않아 이후 섹션 전부가 #about 안에
                      중첩된 채 렌더링됩니다(브라우저 자동 보정). CSS(.section-about 하위 선택자,
                      flat-spacing 여백)가 이 구조에 의존하므로 동일하게 감쌉니다. */}
                  <div id="about" className="section-about flat-spacing">
                    <AboutSection />
                    <WorkSection />
                    <InvestmentSection />
                    <PartnersSection />
                    <ContactSection />
                    <Footer />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <EffectsManager />
    </>
  );
}
