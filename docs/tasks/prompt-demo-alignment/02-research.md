# 프롬프트와 데모 대조 기록

## 목표와 확정 범위

- 122개 기법의 복사용 프롬프트를 실제 React 데모와 CSS에 맞춘다.
- 조합기는 공통 적용 대상 하나만 사용하며, 대상이 비었거나 공백뿐이면 복사를 차단한다.
- 기법 간 충돌은 감지하거나 차단하지 않는다. 서로 다른 스타일을 담아도 대상이 있으면 복사할 수 있다.
- develop → master PR로 검토한다. 이 작업에서 master 병합이나 운영 배포는 하지 않는다.

## 근거와 판단

- 근거: [기법 데이터](../../../src/data/techniques.ts), [데모 구현](../../../src/components/demos/InteractiveDemos.tsx), [공통 키프레임](../../../src/index.css).
- 각 데모의 이벤트, 초기 상태, 타이머, 좌표, 비율, CSS 유틸리티 및 참조 키프레임을 읽고 프롬프트와 대조했다.
- 실제 브라우저 UI를 만드는 것이 목적이므로 현재 데모 구현을 기준으로 삼았다. 클릭/타이머 시연을 실제 드래그, 스크롤, 인증, 요청 성공, 음원 분석으로 설명하지 않는다.
- 기술명에 포함된 일반적인 기능보다 해당 데모에 실제 구현된 동작을 우선했다. 장식용 치수 라벨과 실제 CSS 크기가 다른 경우 구분했다.
- Context7/웹 조회는 사용하지 않았다. 외부 API 사양이나 버전 선택이 아닌 저장소 내부 구현과 문구의 정합성 작업이기 때문이다.
- 패키지와 운영 인프라를 변경하지 않는다. PR 검증 워크플로는 테스트·빌드만 수행한다.

## 122개 대조 결과

도메인별 ui 36개, motion 26개, layout 20개, style 20개, video 20개. 모든 항목의 promptSnippet만 수정하고 ID·분류·제목·요약 등 메타데이터는 보존했다.

| ID | 데모 근거 | 수정·보완 내용 |
| --- | --- | --- |
| magnetic-hover | [MagneticHoverDemo](../../../src/components/demos/InteractiveDemos.tsx#L284) | 이동량 35→42%, 추적 영역·이동/복귀 시간 명시 |
| shimmer-sweep | [ShimmerSweepDemo](../../../src/components/demos/InteractiveDemos.tsx#L314) | 흰색 55%, 2초 반복·클릭 재시작 |
| ripple-click | [RippleClickDemo](../../../src/components/demos/InteractiveDemos.tsx#L333) | 클릭 좌표 y·중앙 정렬·650ms 제거·중복 클릭 |
| neon-glow-pulse | [NeonGlowPulseDemo](../../../src/components/demos/InteractiveDemos.tsx#L367) | 호버가 아닌 초기 ON·클릭 토글, 실제 그림자·주기 |
| liquid-slide-fill | [LiquidSlideFillDemo](../../../src/components/demos/InteractiveDemos.tsx#L385) | 진입·이탈·클릭 조건과 300ms |
| card-flip-3d | [CardFlipDemo](../../../src/components/demos/InteractiveDemos.tsx#L408) | 0.6→0.5초, 양면 숨김·초기/재클릭 |
| tilt-3d-card | [Tilt3DCardDemo](../../../src/components/demos/InteractiveDemos.tsx#L435) | 원근 600→550px·±14도·광택·복귀 |
| glassmorphism-card | [GlassmorphismDemo](../../../src/components/demos/InteractiveDemos.tsx#L472) | 실제 blur 유틸리티·배경 광원 경로/4초 |
| spotlight-border-card | [SpotlightBorderCardDemo](../../../src/components/demos/InteractiveDemos.tsx#L485) | 실제 불투명 배경·0.42·초기 위치·이탈 유지 |
| stacked-card-cycle | [StackedCardCycleDemo](../../../src/components/demos/InteractiveDemos.tsx#L506) | 3장 순환·오프셋/축척/불투명도·300ms |
| spring-bounce-modal | [SpringBounceDemo](../../../src/components/demos/InteractiveDemos.tsx#L536) | 0.48초·80% 축소·초기 재생/클릭 재시작 |
| staggered-list | [StaggeredListDemo](../../../src/components/demos/InteractiveDemos.tsx#L554) | 90→100ms·0.42초·backwards·재시작 |
| smooth-accordion | [SmoothAccordionDemo](../../../src/components/demos/InteractiveDemos.tsx#L585) | 초기 열림·300ms·간격/화살표 |
| morphing-state-button | [MorphingStateButtonDemo](../../../src/components/demos/InteractiveDemos.tsx#L615) | 850ms 시연·실제 너비·진행 중 클릭 취소 |
| floating-levitation | [FloatingLevitationDemo](../../../src/components/demos/InteractiveDemos.tsx#L663) | 그림자 실제 축척/불투명도·2px blur |
| typewriter-streaming | [TypewriterDemo](../../../src/components/demos/InteractiveDemos.tsx#L674) | 50→55ms·종료/클릭 재시작 |
| scramble-decode-text | [ScrambleDecodeDemo](../../../src/components/demos/InteractiveDemos.tsx#L704) | 초기 재생·35ms·문자별 해독·공백/정리 |
| gradient-flow-text | [GradientFlowTextDemo](../../../src/components/demos/InteractiveDemos.tsx#L742) | 3초 ease·배경 경로/색상 |
| slot-number-ticker | [SlotNumberTickerDemo](../../../src/components/demos/InteractiveDemos.tsx#L758) | 650ms 기존 일치·초기값/클릭 범위·취소 보완 |
| marker-highlight-draw | [MarkerHighlightDrawDemo](../../../src/components/demos/InteractiveDemos.tsx#L796) | 초기 200ms·클릭 120ms 재생·위치/곡선 |
| confetti-burst | [ConfettiBurstDemo](../../../src/components/demos/InteractiveDemos.tsx#L838) | 0.8→0.78초·9방향·900ms 제거·시연 트리거 |
| error-shake-tooltip | [ErrorShakeDemo](../../../src/components/demos/InteractiveDemos.tsx#L906) | 실제 클릭 시연·초기 안내 표시·재실행 조건 |
| heart-like-burst | [HeartLikeBurstDemo](../../../src/components/demos/InteractiveDemos.tsx#L942) | 원형 아닌 rounded 링·초기 재생·하트/링 시간 |
| toast-slide-stack | [ToastSlideStackDemo](../../../src/components/demos/InteractiveDemos.tsx#L964) | 초기 1개·최대 2개·자동 제거 없음·380ms |
| sliding-pill-tabs | [SlidingPillTabsDemo](../../../src/components/demos/InteractiveDemos.tsx#L998) | 3개 동일 너비·초기 탭·300ms |
| infinite-marquee | [InfiniteMarqueeDemo](../../../src/components/demos/InteractiveDemos.tsx#L1024) | 9초·중복 목록/간격·호버 정지 없음 |
| skeleton-shimmer | [SkeletonShimmerDemo](../../../src/components/demos/InteractiveDemos.tsx#L1042) | 구성·2초 반복·실제 데이터 요청 없음 |
| spotlight-focus | [SpotlightFocusDemo](../../../src/components/demos/InteractiveDemos.tsx#L1057) | 초기 중간 행·실제 다음 행 클릭 규칙·300ms |
| before-after-slider | [BeforeAfterSliderDemo](../../../src/components/demos/InteractiveDemos.tsx#L1082) | 범위 0~100→10~90·초기 55·range 입력 |
| drag-snap-slot | [DragSnapSlotDemo](../../../src/components/demos/InteractiveDemos.tsx#L1117) | 존재하지 않는 드래그 제거·기본값/0.48초 |
| elastic-toggle-switch | [ElasticToggleSwitchDemo](../../../src/components/demos/InteractiveDemos.tsx#L1150) | 초기 ON·28px·420/220/300ms |
| combo-gauge-pop | [ComboGaugeDemo](../../../src/components/demos/InteractiveDemos.tsx#L1183) | 초기 3/80%·모듈로 순환·0.34초 |
| gooey-menu-fab | [GooeyMenuFabDemo](../../../src/components/demos/InteractiveDemos.tsx#L3691) | 초기 열림·40→45ms 간격·좌표·닫힘 입력 차단 |
| otp-pin-focus-bounce | [OtpPinFocusBounceDemo](../../../src/components/demos/InteractiveDemos.tsx#L3752) | 1.12→1.25·실제 버튼 입력/연속 재생·인증 아님 |
| hold-to-confirm-ring | [HoldToConfirmRingDemo](../../../src/components/demos/InteractiveDemos.tsx#L3843) | 즉시 리셋 아닌 점진 감소·700ms·재누름/초기화 |
| peek-password-lamp | [PeekPasswordLampDemo](../../../src/components/demos/InteractiveDemos.tsx#L3917) | 빛줄기 -18/118%·초기 ON·문자별 18ms·시연 범위 |
| mg-svg-line-draw | [MgSvgLineDrawDemo](../../../src/components/demos/InteractiveDemos.tsx#L1327) | 데모 dash 320·2.4초·65/85% 채움 구간 |
| mg-liquid-blob-morph | [MgLiquidBlobMorphDemo](../../../src/components/demos/InteractiveDemos.tsx#L1346) | 5초·누락된 세 번째 곡률/회전/축척 |
| mg-gooey-metaball | [MgGooeyMetaballDemo](../../../src/components/demos/InteractiveDemos.tsx#L1356) | blur 8→7·blend·이동 경로/2.4초 |
| mg-orbit-rotation | [MgOrbitRotationDemo](../../../src/components/demos/InteractiveDemos.tsx#L1386) | 2개 궤도·5/3.5초·코어 고정 |
| mg-aurora-mesh | [MgAuroraMeshDemo](../../../src/components/demos/InteractiveDemos.tsx#L1673) | 존재하지 않는 screen 제거·실제 blur/3광원 궤적 |
| mg-particle-network | [MgParticleNetworkDemo](../../../src/components/demos/InteractiveDemos.tsx#L1687) | 정적 5노드/7선·호버/클릭 순환·부유 제거 |
| mg-dot-matrix-grid | [MgDotMatrixGridDemo](../../../src/components/demos/InteractiveDemos.tsx#L1742) | 그라데이션/반경 방식 아닌 36개 도트·열 추적 |
| mg-god-ray-beam | [MgGodRayBeamDemo](../../../src/components/demos/InteractiveDemos.tsx#L1784) | 실제 conic-gradient/blur·4초 스웨이 |
| mg-squash-stretch | [MgSquashStretchDemo](../../../src/components/demos/InteractiveDemos.tsx#L1216) | 1.25초·전체 키프레임·실제 부피 보존 아님 |
| mg-anticipation | [MgAnticipationDemo](../../../src/components/demos/InteractiveDemos.tsx#L1227) | -24px 대신 실제 경로·1.6초 반복/클릭 |
| mg-follow-trail | [MgFollowTrailDemo](../../../src/components/demos/InteractiveDemos.tsx#L1246) | 40/80/120→55/110/165ms·실제 크기/왕복 |
| mg-easing-curves | [MgEasingCurvesDemo](../../../src/components/demos/InteractiveDemos.tsx#L1289) | 스프링 1.56→1.30·3트랙·0.9/1.6초 |
| mg-kinetic-wave-text | [MgKineticWaveTextDemo](../../../src/components/demos/InteractiveDemos.tsx#L1406) | 70→75ms·1.3초·회전/색 변화 |
| mg-3d-text-roller | [Mg3DTextRollerDemo](../../../src/components/demos/InteractiveDemos.tsx#L1427) | 트랙 백분율 오류→28px 행 높이·1.4초 |
| mg-neon-sign-flicker | [MgNeonSignFlickerDemo](../../../src/components/demos/InteractiveDemos.tsx#L1467) | 2.8초·실제 그림자·부분 적용 |
| mg-parallax-depth | [MgParallaxDepthDemo](../../../src/components/demos/InteractiveDemos.tsx#L1480) | 원시좌표 /6·계수0.4/1.1/2.1·스크롤 제거 |
| mg-rack-focus-blur | [MgRackFocusBlurDemo](../../../src/components/demos/InteractiveDemos.tsx#L1520) | 실제 blur-xs·inactive0.9·초기 전경/500ms |
| mg-ken-burns-pan | [MgKenBurnsPanDemo](../../../src/components/demos/InteractiveDemos.tsx#L1552) | 6초·px 경로·왕복·가이드 고정 |
| mg-isometric-explode | [MgIsometricExplodeDemo](../../../src/components/demos/InteractiveDemos.tsx#L1572) | 존재하지 않는 translateZ 제거·초기/포인터·18/5px |
| mg-iris-circle-wipe | [MgIrisCircleWipeDemo](../../../src/components/demos/InteractiveDemos.tsx#L1610) | 140→120%·650ms·초기/수동 토글 |
| mg-rgb-chromatic-glitch | [MgRgbChromaticGlitchDemo](../../../src/components/demos/InteractiveDemos.tsx#L1634) | 평상시 ±2px·2.2초·86/89/92% 구간 |
| mg-speed-lines-streak | [MgSpeedLinesStreakDemo](../../../src/components/demos/InteractiveDemos.tsx#L1648) | 서로 다른 속도 아닌 지연·4개 실제 값·750ms |
| mg-radar-sonar-sweep | [MgRadarSonarSweepDemo](../../../src/components/demos/InteractiveDemos.tsx#L3973) | 40ms 각도 갱신·클릭 속도·105도 탐지 조건 |
| mg-morphing-grid-wave | [MgMorphingGridWaveDemo](../../../src/components/demos/InteractiveDemos.tsx#L4037) | 90ms 지연 아닌260ms tick·두 대각선·실제 축척 |
| mg-prism-rainbow-refraction | [MgPrismRainbowRefractionDemo](../../../src/components/demos/InteractiveDemos.tsx#L4078) | 실제 SVG·6선·초기/0.45배 토글·광학/blur 오해 제거 |
| mg-gravity-newton-cradle | [MgGravityNewtonCradleDemo](../../../src/components/demos/InteractiveDemos.tsx#L4155) | 34도·320ms4단계·300ms·물리 시연 범위 |
| ly-bento-grid | [LyBentoGridDemo](../../../src/components/demos/InteractiveDemos.tsx#L1809) | 140px 자동행 제거·4타일/초기 선택·6px 간격 |
| ly-masonry-waterfall | [LyMasonryWaterfallDemo](../../../src/components/demos/InteractiveDemos.tsx#L1862) | 실제 3개 고정 열·높이 토글·자동 masonry 아님 |
| ly-editorial-asymmetric | [LyEditorialAsymmetricDemo](../../../src/components/demos/InteractiveDemos.tsx#L1889) | 존재하지 않는7:5기사배치→실제 겹침·호버/클릭 |
| ly-honeycomb-hex | [LyHoneycombHexDemo](../../../src/components/demos/InteractiveDemos.tsx#L1916) | 행 수/중앙정렬·음수14px·키보드 선택/기본값 |
| ly-sticky-scrolltelling | [LyStickyScrolltellingDemo](../../../src/components/demos/InteractiveDemos.tsx#L2012) | 실제 클릭 단계 시연·sticky/scroll 미구현 구분 |
| ly-fullpage-snap | [LyFullpageSnapDemo](../../../src/components/demos/InteractiveDemos.tsx#L2053) | 실제 클릭3섹션·96px·500ms·scroll-snap 아님 |
| ly-horizontal-showcase | [LyHorizontalShowcaseDemo](../../../src/components/demos/InteractiveDemos.tsx#L2090) | 실제76px 이동·4카드·클릭 시연/스크롤 구분 |
| ly-curtain-reveal | [LyCurtainRevealDemo](../../../src/components/demos/InteractiveDemos.tsx#L2143) | 48px 클릭 커튼·고정 푸터/스크롤 미구현 구분 |
| ly-macos-dock | [LyMacosDockDemo](../../../src/components/demos/InteractiveDemos.tsx#L2172) | 인접1.2→1.18·150ms·이탈 중앙 복귀 |
| ly-command-palette | [LyCommandPaletteDemo](../../../src/components/demos/InteractiveDemos.tsx#L2203) | 실제 표시 패널·단축키/검색/명령 실행 미구현 |
| ly-dynamic-island-nav | [LyDynamicIslandNavDemo](../../../src/components/demos/InteractiveDemos.tsx#L2235) | 128/224px·초기 접힘·300ms·실제 고정/재생 아님 |
| ly-radial-pie-menu | [LyRadialPieMenuDemo](../../../src/components/demos/InteractiveDemos.tsx#L2273) | 4개 고정좌표·초기 열림·35ms 지연·명령 없음 |
| ly-bottom-sheet | [LyBottomSheetDemo](../../../src/components/demos/InteractiveDemos.tsx#L2321) | 3단계→2단계·실제56/96px·클릭 시연 |
| ly-master-detail-split | [LyMasterDetailSplitDemo](../../../src/components/demos/InteractiveDemos.tsx#L2349) | 35:65→40:60·초기선택·scroll/API 미구현 |
| ly-kanban-board | [LyKanbanBoardDemo](../../../src/components/demos/InteractiveDemos.tsx#L2385) | 단일카드·초기 DOING·클릭순환·배지/드래그 제거 |
| ly-heatmap-grid | [LyHeatmapGridDemo](../../../src/components/demos/InteractiveDemos.tsx#L2413) | 7행→4행10열·40셀·실제 크기/생성식 |
| ly-floating-toc-spy | [LyFloatingTocSpyDemo](../../../src/components/demos/InteractiveDemos.tsx#L4209) | observer 아닌1.8초 시연·22px 동기화·500/300ms |
| ly-collapsible-rail-sidebar | [LyCollapsibleRailSidebarDemo](../../../src/components/demos/InteractiveDemos.tsx#L4278) | 실제112/36px·오해 소지 배지 구분·툴팁/라우팅 제거 |
| ly-breadcrumb-folder-drill | [LyBreadcrumbFolderDrillDemo](../../../src/components/demos/InteractiveDemos.tsx#L4347) | 초기 경로/파일·상위 복귀·파일명 유지·시연 범위 |
| ly-resizable-split-pane | [LyResizableSplitPaneDemo](../../../src/components/demos/InteractiveDemos.tsx#L4423) | 초기45·제한25~75·반올림·8px·종료/프리셋 |
| st-neo-brutalism | [StNeoBrutalismDemo](../../../src/components/demos/InteractiveDemos.tsx#L2443) | 테두리2→3px·그림자4→5px·이동2→4px·토글 |
| st-liquid-acrylic | [StLiquidAcrylicDemo](../../../src/components/demos/InteractiveDemos.tsx#L2462) | 실제20→5%표면/30%보더·inset/광학 계산 제거 |
| st-linear-dark-minimal | [StLinearDarkMinimalDemo](../../../src/components/demos/InteractiveDemos.tsx#L2476) | 실제#090A0F/#12131A·인디고 헤어라인·정적 |
| st-matte-film-grain | [StMatteFilmGrainDemo](../../../src/components/demos/InteractiveDemos.tsx#L2491) | SVG노이즈→실제6px정적도트·불투명도 |
| st-neumorphism-soft | [StNeumorphismSoftDemo](../../../src/components/demos/InteractiveDemos.tsx#L2511) | 실제#334155·음각5/10px·클릭 상태 유지 |
| st-claymorphism-3d | [StClaymorphism3DDemo](../../../src/components/demos/InteractiveDemos.tsx#L2531) | 실제12px 내부그림자·24px모서리·호버/토글 |
| st-skeuomorphism-tactile | [StSkeuomorphismTactileDemo](../../../src/components/demos/InteractiveDemos.tsx#L2552) | 하단턱/3px누름→실제2px ON/OFF·그림자 |
| st-paper-cutout-layer | [StPaperCutoutLayerDemo](../../../src/components/demos/InteractiveDemos.tsx#L2583) | 실제-4/3deg·3레이어·정적 |
| st-8bit-pixel-retro | [St8BitPixelRetroDemo](../../../src/components/demos/InteractiveDemos.tsx#L2599) | 4방향테두리→단일오프셋·초기99/클릭증가 |
| st-win95-retro-os | [StWin95RetroOsDemo](../../../src/components/demos/InteractiveDemos.tsx#L2616) | 배경청록·×1개·창조작 미구현 |
| st-crt-scanline-terminal | [StCrtScanlineTerminalDemo](../../../src/components/demos/InteractiveDemos.tsx#L2641) | 실제0.38·drop-shadow·정적입력아님 |
| st-synthwave-sunset-grid | [StSynthwaveSunsetGridDemo](../../../src/components/demos/InteractiveDemos.tsx#L2660) | 200/60→120px/55deg·태양 줄무늬 없음 |
| st-scifi-hud-chamfer | [StScifiHudChamferDemo](../../../src/components/demos/InteractiveDemos.tsx#L2681) | 실제절단방향/12px·1.5px중첩프레임 |
| st-architect-blueprint | [StArchitectBlueprintDemo](../../../src/components/demos/InteractiveDemos.tsx#L2711) | 배경/격자20→14px·장식치수구분·십자선없음 |
| st-swiss-editorial-grid | [StSwissEditorialGridDemo](../../../src/components/demos/InteractiveDemos.tsx#L2732) | 오렌지/1px→빨강/2px·실제1:2그리드 |
| st-comic-halftone-pop | [StComicHalftonePopDemo](../../../src/components/demos/InteractiveDemos.tsx#L2754) | 도트색/8px·skew아닌±3deg회전·클릭문구 |
| st-holographic-foil-card | [StHolographicFoilCardDemo](../../../src/components/demos/InteractiveDemos.tsx#L4485) | 실제각도125/90~230·클릭45도·blend/size제거 |
| st-receipt-thermal-mono | [StReceiptThermalMonoDemo](../../../src/components/demos/InteractiveDemos.tsx#L4527) | 지그재그없는점선·18막대·초기PAID/클릭토글 |
| st-vaporwave-y2k-chrome | [StVaporwaveY2kChromeDemo](../../../src/components/demos/InteractiveDemos.tsx#L4576) | 크롬실제색·초기PLAY/클릭CUE·재생아님 |
| st-cyberpunk-neon-glitch | [StCyberpunkNeonGlitchDemo](../../../src/components/demos/InteractiveDemos.tsx#L4618) | 12px컷아웃·실제5px경고띠·클릭토글/정적 |
| vd-saas-launch-reel | [VdSaasLaunchReelDemo](../../../src/components/demos/InteractiveDemos.tsx#L2782) | 장면별 1.5/2/1.5초를 균일 1.6초로 수정하고 실제 없는 3D 대시보드 요구 제거. |
| vd-device-3d-spin | [VdDevice3DSpinDemo](../../../src/components/demos/InteractiveDemos.tsx#L2850) | 회전 각도·배율·1.8초 교대·700ms와 알림 동시 시작 조건 명시. |
| vd-app-walkthrough-zoom | [VdAppWalkthroughZoomDemo](../../../src/components/demos/InteractiveDemos.tsx#L2892) | 줌 1.65 대신 1.48·실제 좌표·500ms·1.4초와 모의 완료 조건 보정. |
| vd-split-promo-reel | [VdSplitPromoReelDemo](../../../src/components/demos/InteractiveDemos.tsx#L2953) | 실제 3단계의 translate/opacity 전환·초기 정렬·1.3초를 명시하고 없는 와이프 제거. |
| vd-glitch-cut-reel | [VdGlitchCutReelDemo](../../../src/components/demos/InteractiveDemos.tsx#L4657) | 자동/클릭 스펙 전환의 서로 다른 90/220/200ms 조건과 실제 글리치 수치 명시. |
| vd-stomp-beat-typo | [VdStompBeatTypoDemo](../../../src/components/demos/InteractiveDemos.tsx#L3016) | 550ms→750ms, 초기 배율2.2→2.15, 실제 0.36초 키프레임 보정. |
| vd-highlight-swipe-reveal | [VdHighlightSwipeRevealDemo](../../../src/components/demos/InteractiveDemos.tsx#L3054) | scaleX가 아닌 translateX ±102%, 단계별120/420/1600ms와 태그90ms 보정. |
| vd-countdown-energetic-intro | [VdCountdownEnergeticIntroDemo](../../../src/components/demos/InteractiveDemos.tsx#L3112) | 0/메인 전환 대신3·2·1·LIVE 반복,800/1300ms와 실제1.14 배율 보정. |
| vd-chat-story-sequence | [VdChatStorySequenceDemo](../../../src/components/demos/InteractiveDemos.tsx#L3152) | 타이핑 점120ms·단계1.3초·초기완료와 실제 AI 미호출 조건 명시. |
| vd-slot-jackpot-headline | [VdSlotJackpotHeadlineDemo](../../../src/components/demos/InteractiveDemos.tsx#L4720) | 250ms stagger 대신680ms step 진행·열별 정지·실제36px과300ms 조건 명시. |
| vd-animated-bar-race | [VdAnimatedBarRaceDemo](../../../src/components/demos/InteractiveDemos.tsx#L3200) | 0%·100ms·완료 후 배지를12%·75ms·즉시 표시로 보정. |
| vd-kpi-counter-explosion | [VdKpiCounterExplosionDemo](../../../src/components/demos/InteractiveDemos.tsx#L3243) | 없는 순차 슬라이드 대신 동시900ms 카운트업·92/82/74%·2.8초 반복 보정. |
| vd-node-flow-pipeline | [VdNodeFlowPipelineDemo](../../../src/components/demos/InteractiveDemos.tsx#L3322) | 없는 Active 배지 제거,950/80ms·패킷12/48/82%와 단일 노드 점등 보정. |
| vd-circular-ring-dashboard | [VdCircularRingDashboardDemo](../../../src/components/demos/InteractiveDemos.tsx#L3376) | 92/78/64%→88/78/68%, 실제dash 수치·700ms·75ms 지연 및 범례 즉시 전환. |
| vd-funnel-conversion-drop | [VdFunnelConversionDropDemo](../../../src/components/demos/InteractiveDemos.tsx#L4786) | 250ms 대신900ms stage, 실제 폭·잔상opacity.15·하단 배지와 초기3단계 명시. |
| vd-lower-third-banner | [VdLowerThirdBannerDemo](../../../src/components/demos/InteractiveDemos.tsx#L3452) | 엄격한3순차 대신 동시 시작+서브100ms,실제300/500ms와2.2초/850ms 반영. |
| vd-diagonal-shutter-wipe | [VdDiagonalShutterWipeDemo](../../../src/components/demos/InteractiveDemos.tsx#L3495) | 80ms→70ms,실제±150%·500ms·280ms교체/720ms리셋·재클릭 정리 조건 명시. |
| vd-logo-stinger-outro | [VdLogoStingerOutroDemo](../../../src/components/demos/InteractiveDemos.tsx#L3567) | 자간 축소→확대,로고 spring 대신500ms전환·링 단계별 재생·450/500/1800ms 보정. |
| vd-audio-spectrum-visualizer | [VdAudioSpectrumVisualizerDemo](../../../src/components/demos/InteractiveDemos.tsx#L3629) | 없는 진행 바·실제오디오 제거,16개 높이·주기·타임코드·일시정지 조건 명시. |
| vd-breaking-news-ticker | [VdBreakingNewsTickerDemo](../../../src/components/demos/InteractiveDemos.tsx#L4832) | 실제 헤더 위치·고정문구·2초 교체·.38초 등장·2배트랙9초 루프 보정. |

## 검증 범위와 한계

- 정적 대조: 122개 전부. ID 중복·누락, 데모 매핑 누락, 프롬프트 변경, 메타데이터 보존을 스크립트로 확인했다.
- 자동 테스트: `npm test` 11개 통과. 조합기의 빈 대상/공백 차단, 입력 후 허용, 적용 범위와 선택 순서, 다른 스타일 동시 복사, 기존 복사 실패 처리 및 저장 복원을 확인했다.
- 빌드: `npm run build` 통과. TypeScript 검사와 Vite 프로덕션 빌드를 실행했다.
- 브라우저: 로컬 프로덕션 프리뷰에서 공백 입력 시 복사 비활성화, 대상 입력 후 활성화, 적용 범위·수정된 마그네틱 호버 문구 표시, 클릭 후 복사 완료 표시를 확인했다. 새로고침 후 선택 기법과 입력 대상이 유지되는 것도 확인했다.
- 122개 데모의 모든 프레임을 브라우저에서 수치 측정한 결과는 아니다. 프롬프트를 외부 AI에 넣어 122개 결과를 생성하거나 픽셀 단위 재현성을 평가하지 않았다.
- 남은 기획 질문은 없다. 실제 생성 모델에 따른 표현 차이는 이번 코드 대조만으로 보장할 수 없다.
