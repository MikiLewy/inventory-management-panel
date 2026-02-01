import { getI18n } from '@/locales/server';

export default async function PrivacyPolicyPage() {
  const t = await getI18n();

  return (
    <div className="space-y-8">
      <header className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">{t('legal.privacyPolicy.title')}</h1>
        <p className="text-muted-foreground">{t('legal.privacyPolicy.lastUpdated')}</p>
      </header>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">{t('legal.privacyPolicy.introduction.title')}</h2>
        <p>{t('legal.privacyPolicy.introduction.content')}</p>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">{t('legal.privacyPolicy.dataCollection.title')}</h2>
        <p>{t('legal.privacyPolicy.dataCollection.content')}</p>
        <ul className="list-disc space-y-2 pl-6">
          <li>{t('legal.privacyPolicy.dataCollection.items.account')}</li>
          <li>{t('legal.privacyPolicy.dataCollection.items.inventory')}</li>
          <li>{t('legal.privacyPolicy.dataCollection.items.sales')}</li>
          <li>{t('legal.privacyPolicy.dataCollection.items.warehouse')}</li>
        </ul>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">{t('legal.privacyPolicy.howWeUse.title')}</h2>
        <p>{t('legal.privacyPolicy.howWeUse.content')}</p>
        <ul className="list-disc space-y-2 pl-6">
          <li>{t('legal.privacyPolicy.howWeUse.items.provide')}</li>
          <li>{t('legal.privacyPolicy.howWeUse.items.authenticate')}</li>
          <li>{t('legal.privacyPolicy.howWeUse.items.analytics')}</li>
          <li>{t('legal.privacyPolicy.howWeUse.items.improve')}</li>
          <li>{t('legal.privacyPolicy.howWeUse.items.communicate')}</li>
        </ul>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">{t('legal.privacyPolicy.dataStorage.title')}</h2>
        <p>{t('legal.privacyPolicy.dataStorage.content')}</p>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">{t('legal.privacyPolicy.dataSharing.title')}</h2>
        <p>{t('legal.privacyPolicy.dataSharing.content')}</p>
        <ul className="list-disc space-y-2 pl-6">
          <li>{t('legal.privacyPolicy.dataSharing.items.service')}</li>
          <li>{t('legal.privacyPolicy.dataSharing.items.legal')}</li>
          <li>{t('legal.privacyPolicy.dataSharing.items.protection')}</li>
        </ul>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">{t('legal.privacyPolicy.yourRights.title')}</h2>
        <p>{t('legal.privacyPolicy.yourRights.content')}</p>
        <ul className="list-disc space-y-2 pl-6">
          <li>{t('legal.privacyPolicy.yourRights.items.access')}</li>
          <li>{t('legal.privacyPolicy.yourRights.items.correction')}</li>
          <li>{t('legal.privacyPolicy.yourRights.items.deletion')}</li>
          <li>{t('legal.privacyPolicy.yourRights.items.export')}</li>
          <li>{t('legal.privacyPolicy.yourRights.items.withdraw')}</li>
        </ul>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">{t('legal.privacyPolicy.cookies.title')}</h2>
        <p>{t('legal.privacyPolicy.cookies.content')}</p>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">{t('legal.privacyPolicy.changes.title')}</h2>
        <p>{t('legal.privacyPolicy.changes.content')}</p>
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-semibold">{t('legal.privacyPolicy.contact.title')}</h2>
        <p>{t('legal.privacyPolicy.contact.content')}</p>
      </section>
    </div>
  );
}
