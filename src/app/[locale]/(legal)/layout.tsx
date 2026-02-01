import { Footer } from '@features/home/components/organisms/footer';
import { Header } from '@features/home/components/organisms/header';

const LegalLayout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="bg-background min-h-svh flex flex-col">
      <Header />
      <main className="container mx-auto max-w-4xl px-6 pt-28 pb-8 md:pb-12 flex-1">
        <article className="prose prose-neutral dark:prose-invert max-w-none">{children}</article>
      </main>
      <Footer />
    </div>
  );
};

export default LegalLayout;
