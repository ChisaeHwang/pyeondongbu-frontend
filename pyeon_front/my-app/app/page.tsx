export default function Home() {
  return (
    <div className="flex items-center justify-center min-h-screen p-8">
      <main className="flex flex-col items-center text-center max-w-2xl">
        <div className="mb-8">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4 text-foreground">
            서비스가 종료되었습니다
          </h1>
          <div className="w-24 h-1 bg-foreground mx-auto mb-8 rounded"></div>
        </div>

        <div className="space-y-6 text-lg sm:text-xl text-foreground/80">
          <p>
            그동안 저희 서비스를 이용해 주셔서 진심으로 감사드립니다.
          </p>
          <p>
            여러분의 관심과 사랑 덕분에 좋은 추억을 만들 수 있었습니다.
          </p>
          <p className="pt-4 text-base sm:text-lg text-foreground/60">
            더 나은 모습으로 다시 찾아뵐 수 있기를 바랍니다.
          </p>
        </div>

        <div className="mt-12 pt-8 border-t border-foreground/10 w-full">
          <p className="text-sm text-foreground/50">
            문의사항이 있으시면 언제든지 연락 주시기 바랍니다.
          </p>
        </div>
      </main>
    </div>
  );
}
