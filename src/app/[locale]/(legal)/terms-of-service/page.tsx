import { getI18n } from '@/locales/server';

export default async function TermsOfServicePage() {
  const t = await getI18n();

  return (
    <div className="space-y-8">
      <header className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">{t('legal.termsOfService.title')}</h1>
        <p className="text-muted-foreground">{t('legal.termsOfService.lastUpdated')}</p>
      </header>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">{t('legal.termsOfService.acceptance.title')}</h2>
        <p>{t('legal.termsOfService.acceptance.content')}</p>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">{t('legal.termsOfService.description.title')}</h2>
        <p>{t('legal.termsOfService.description.content')}</p>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">{t('legal.termsOfService.accounts.title')}</h2>
        <p>{t('legal.termsOfService.accounts.content')}</p>
        <ul className="list-disc space-y-2 pl-6">
          <li>{t('legal.termsOfService.accounts.items.accurate')}</li>
          <li>{t('legal.termsOfService.accounts.items.security')}</li>
          <li>{t('legal.termsOfService.accounts.items.notify')}</li>
          <li>{t('legal.termsOfService.accounts.items.responsible')}</li>
          <li>{t('legal.termsOfService.accounts.items.age')}</li>
        </ul>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">{t('legal.termsOfService.acceptableUse.title')}</h2>
        <p>{t('legal.termsOfService.acceptableUse.content')}</p>
        <ul className="list-disc space-y-2 pl-6">
          <li>{t('legal.termsOfService.acceptableUse.items.illegal')}</li>
          <li>{t('legal.termsOfService.acceptableUse.items.interfere')}</li>
          <li>{t('legal.termsOfService.acceptableUse.items.unauthorized')}</li>
          <li>{t('legal.termsOfService.acceptableUse.items.malicious')}</li>
          <li>{t('legal.termsOfService.acceptableUse.items.scraping')}</li>
          <li>{t('legal.termsOfService.acceptableUse.items.impersonate')}</li>
        </ul>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">
          {t('legal.termsOfService.intellectualProperty.title')}
        </h2>
        <p>{t('legal.termsOfService.intellectualProperty.content')}</p>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">{t('legal.termsOfService.disclaimers.title')}</h2>
        <p>{t('legal.termsOfService.disclaimers.content')}</p>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">{t('legal.termsOfService.termination.title')}</h2>
        <p>{t('legal.termsOfService.termination.content')}</p>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">{t('legal.termsOfService.governingLaw.title')}</h2>
        <p>{t('legal.termsOfService.governingLaw.content')}</p>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">{t('legal.termsOfService.changes.title')}</h2>
        <p>{t('legal.termsOfService.changes.content')}</p>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">{t('legal.termsOfService.contact.title')}</h2>
        <p>{t('legal.termsOfService.contact.content')}</p>
      </section>
    </div>
  );
}
