export default {
  backToHome: 'Back to Home',
  privacyPolicy: {
    title: 'Privacy Policy',
    lastUpdated: 'Last updated: February 1, 2026',
    introduction: {
      title: '1. Introduction',
      content:
        'Welcome to Stoqio. We respect your privacy and are committed to protecting your personal data. This privacy policy explains how we collect, use, and safeguard your information when you use our inventory management service.',
    },
    dataCollection: {
      title: '2. Information We Collect',
      content: 'We collect the following types of information:',
      items: {
        account: 'Account Information: Email address and password (encrypted) for authentication purposes.',
        inventory:
          'Inventory Data: Product names, descriptions, quantities, sizes, purchase prices, and sale prices that you enter into the system.',
        sales: 'Sales Data: Transaction records including sale dates, prices, and profit calculations.',
        warehouse:
          'Warehouse Information: Warehouse names, addresses, postcodes, cities, and countries that you configure.',
      },
    },
    howWeUse: {
      title: '3. How We Use Your Information',
      content: 'We use the information we collect to:',
      items: {
        provide: 'Provide and maintain our inventory management service.',
        authenticate: 'Authenticate your account and ensure security.',
        analytics: 'Generate statistics and analytics about your inventory and sales performance.',
        improve: 'Improve our service and develop new features.',
        communicate: 'Communicate with you about service updates or support requests.',
      },
    },
    dataStorage: {
      title: '4. Data Storage and Security',
      content:
        'Your data is stored securely using industry-standard practices. All data transmissions are encrypted using TLS/SSL protocols. We implement appropriate technical and organizational measures to protect your personal data against unauthorized access, alteration, or destruction.',
    },
    dataSharing: {
      title: '5. Data Sharing',
      content:
        'We do not sell, trade, or rent your personal information to third parties. We may share your data only in the following circumstances:',
      items: {
        service:
          'With service providers who assist us in operating our platform (e.g., hosting providers), under strict confidentiality agreements.',
        legal: 'When required by law or to respond to valid legal processes.',
        protection: 'To protect our rights, privacy, safety, or property, or that of our users.',
      },
    },
    yourRights: {
      title: '6. Your Rights',
      content: 'You have the right to:',
      items: {
        access: 'Access the personal data we hold about you.',
        correction: 'Request correction of inaccurate data.',
        deletion: 'Request deletion of your data (subject to legal retention requirements).',
        export: 'Export your data in a portable format.',
        withdraw: 'Withdraw consent for data processing where applicable.',
      },
    },
    cookies: {
      title: '7. Cookies and Tracking',
      content:
        'We use essential cookies to maintain your session and preferences. We do not use third-party tracking cookies for advertising purposes. You can control cookie settings through your browser preferences.',
    },
    changes: {
      title: '8. Changes to This Policy',
      content:
        'We may update this privacy policy from time to time. We will notify you of any significant changes by posting the new policy on this page and updating the "Last updated" date. We encourage you to review this policy periodically.',
    },
    contact: {
      title: '9. Contact Us',
      content:
        'If you have any questions about this privacy policy or our data practices, please contact us at support@stoqio.com.',
    },
  },
  termsOfService: {
    title: 'Terms of Service',
    lastUpdated: 'Last updated: February 1, 2026',
    acceptance: {
      title: '1. Acceptance of Terms',
      content:
        'By accessing or using Stoqio, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our service. We reserve the right to modify these terms at any time, and your continued use of the service constitutes acceptance of any changes.',
    },
    description: {
      title: '2. Description of Service',
      content:
        'Stoqio is an inventory management platform that provides tools for tracking product inventory, managing warehouses, recording sales, and generating business statistics.',
    },
    accounts: {
      title: '3. User Accounts and Responsibilities',
      content: 'When creating an account, you agree to:',
      items: {
        accurate: 'Provide accurate and complete registration information.',
        security: 'Maintain the security of your account credentials and not share them with others.',
        notify: 'Notify us immediately of any unauthorized access to your account.',
        responsible: 'Be responsible for all activities that occur under your account.',
        age: 'Be at least 18 years old or have parental consent to use the service.',
      },
    },
    acceptableUse: {
      title: '4. Acceptable Use',
      content: 'You agree not to:',
      items: {
        illegal: 'Use the service for any illegal purposes.',
        interfere: 'Interfere with or disrupt the service or its infrastructure.',
        unauthorized: 'Attempt to gain unauthorized access to any part of the service.',
        malicious: 'Upload malicious code or content that could harm the service or other users.',
        scraping: 'Use automated tools to scrape or extract data from the service without permission.',
        impersonate: 'Impersonate any person or entity.',
      },
    },
    intellectualProperty: {
      title: '5. Intellectual Property',
      content:
        'The Stoqio service, including its design, features, and content, is protected by intellectual property laws. You retain ownership of the data you enter into the system. By using our service, you grant us a limited license to store, process, and display your data solely for the purpose of providing the service to you.',
    },
    disclaimers: {
      title: '6. Disclaimers and Limitations',
      content:
        'We do not guarantee that the service will be uninterrupted, error-free, or completely secure. To the maximum extent permitted by law, we shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of the service.',
    },
    termination: {
      title: '7. Termination',
      content:
        'We reserve the right to suspend or terminate your access to the service at any time for violation of these terms or for any other reason at our discretion. You may terminate your account at any time by contacting support. Upon termination, your right to use the service ceases immediately.',
    },
    governingLaw: {
      title: '8. Governing Law',
      content:
        'These terms shall be governed by and construed in accordance with the laws of the jurisdiction in which Stoqio operates, without regard to conflict of law principles. Any disputes arising from these terms or your use of the service shall be resolved in the appropriate courts of that jurisdiction.',
    },
    changes: {
      title: '9. Changes to Terms',
      content:
        'We may revise these terms from time to time. Material changes will be communicated through the service or via email. Your continued use of the service after such changes constitutes acceptance of the new terms.',
    },
    contact: {
      title: '10. Contact Us',
      content: 'If you have any questions about these Terms of Service, please contact us at support@stoqio.com.',
    },
  },
} as const;
