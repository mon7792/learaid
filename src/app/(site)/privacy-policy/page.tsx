import {
  Shield,
  Eye,
  Database,
  Lock,
  UserCheck,
  AlertTriangle,
  Globe,
  DraftingCompass,
  Mail,
  Settings,
} from "lucide-react";
import Link from "next/link";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";

export default function PrivacyPolicyPage() {
  const lastUpdated = "January 25, 2025";
  const version = "1.0.0";

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      {/* Header */}
      <header className="w-full p-6 flex justify-between items-center border-b bg-background/95 backdrop-blur">
        <Link
          href="/"
          className="flex items-center gap-2 hover:opacity-80 transition-opacity"
        >
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <DraftingCompass className="w-5 h-5 text-primary-foreground rotate-180" />
          </div>
          <span className="text-2xl font-bold font-sora">Vanita</span>
        </Link>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-6 py-12">
        <div className="space-y-8">
          {/* Title Section */}
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Shield className="w-12 h-12 text-primary" />
            </div>
            <h1 className="text-4xl font-bold tracking-tight">
              Privacy Policy
            </h1>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-2 text-sm text-muted-foreground">
              <span>Last Updated: {lastUpdated}</span>
              <span className="hidden sm:block">•</span>
              <span>Version: {version}</span>
            </div>
          </div>

          {/* Beta Notice */}
          <Alert className="border-orange-200 bg-orange-50 dark:border-orange-800 dark:bg-orange-950/50">
            <AlertTriangle className="h-4 w-4 text-orange-600" />
            <AlertDescription className="text-orange-800 dark:text-orange-200">
              <strong>Beta Service Notice:</strong> As a beta service, our data
              handling practices may evolve. We will notify users of any
              significant changes to this Privacy Policy and provide appropriate
              migration options for existing data.
            </AlertDescription>
          </Alert>

          {/* Introduction */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Eye className="w-5 h-5" />
                Introduction
              </CardTitle>
            </CardHeader>
            <CardContent className="prose prose-neutral dark:prose-invert max-w-none">
              <p>
                At Vanita (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;),
                we take your privacy seriously. This Privacy Policy explains how
                we collect, use, process, and protect your personal information
                when you use our AI-powered diagram generation service.
              </p>
              <p>
                This policy applies to our website, application, and all related
                services. By using Vanita, you consent to the practices
                described in this Privacy Policy.
              </p>
              <p>
                <strong>Key Commitment:</strong> We believe in transparency,
                data minimization, and giving you control over your personal
                information.
              </p>
            </CardContent>
          </Card>

          {/* Data Collection & Usage */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="w-5 h-5" />
                1. Data Collection & Usage
              </CardTitle>
            </CardHeader>
            <CardContent className="prose prose-neutral dark:prose-invert max-w-none">
              <h4>1.1 Information We Collect</h4>

              <h5>Account Information (via GitHub OAuth)</h5>
              <ul>
                <li>GitHub username and profile information</li>
                <li>Email address associated with your GitHub account</li>
                <li>Profile picture/avatar from GitHub</li>
                <li>Public GitHub profile data (name, bio)</li>
              </ul>

              <h5>Service Usage Data</h5>
              <ul>
                <li>Diagram prompts and text inputs you provide</li>
                <li>Generated diagrams and their metadata</li>
                <li>Chat history and conversation logs</li>
                <li>Token usage and billing information</li>
                <li>Feature usage patterns and preferences</li>
              </ul>

              <h5>Technical and Analytics Data</h5>
              <ul>
                <li>IP address and geolocation (country/region level)</li>
                <li>Device type, browser information, and operating system</li>
                <li>Session duration and page interactions</li>
                <li>Error logs and performance metrics</li>
                <li>API response times and system performance data</li>
              </ul>

              <h5>Payment Information</h5>
              <ul>
                <li>Stripe customer ID and payment metadata</li>
                <li>Transaction history and payment status</li>
                <li>Billing address (processed by Stripe)</li>
                <li>Note: We do not store credit card details directly</li>
              </ul>

              <h4>1.2 How We Use Your Data</h4>

              <h5>Service Delivery</h5>
              <ul>
                <li>
                  Process your prompts through OpenAI&apos;s API to generate
                  diagrams
                </li>
                <li>
                  Store and retrieve your diagrams and conversation history
                </li>
                <li>Manage your account and authentication</li>
                <li>Process payments and manage token balances</li>
              </ul>

              <h5>Service Improvement</h5>
              <ul>
                <li>
                  Analyze usage patterns to improve features and performance
                </li>
                <li>Monitor system health and identify technical issues</li>
                <li>Conduct beta testing and feature development</li>
                <li>Provide customer support and troubleshooting</li>
              </ul>

              <h5>Communication</h5>
              <ul>
                <li>
                  Send important service updates and security notifications
                </li>
                <li>Respond to support requests and feedback</li>
                <li>Notify about beta program updates (if applicable)</li>
              </ul>

              <h4>1.3 OpenAI API Integration</h4>
              <p>
                Your diagram prompts are sent to OpenAI&apos;s API for
                processing. This data is subject to OpenAI&apos;s data usage
                policies. We recommend reviewing OpenAI&apos;s privacy policy
                for details on how they handle API requests.
              </p>
              <ul>
                <li>
                  Prompts are processed in real-time and not permanently stored
                  by OpenAI
                </li>
                <li>
                  We do not share personal identifying information with OpenAI
                </li>
                <li>
                  API responses are used solely to provide diagram generation
                  services
                </li>
              </ul>

              <h4>1.4 Beta Testing Data Handling</h4>
              <ul>
                <li>
                  Beta usage data helps us identify bugs and improve
                  functionality
                </li>
                <li>
                  We may collect additional diagnostic information during beta
                  phases
                </li>
                <li>
                  Beta feedback and reports are stored securely and used for
                  development
                </li>
                <li>
                  Data collected during beta may be retained for service
                  improvement
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* Security Measures */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lock className="w-5 h-5" />
                2. Security Measures
              </CardTitle>
            </CardHeader>
            <CardContent className="prose prose-neutral dark:prose-invert max-w-none">
              <h4>2.1 Data Encryption</h4>
              <ul>
                <li>
                  <strong>In Transit:</strong> All data transmitted between your
                  device and our servers is encrypted using TLS 1.3
                </li>
                <li>
                  <strong>At Rest:</strong> Stored data is encrypted using
                  AES-256 encryption standards
                </li>
                <li>
                  <strong>Database Security:</strong> PostgreSQL databases with
                  encrypted storage and secure connections
                </li>
                <li>
                  <strong>API Communications:</strong> All third-party API calls
                  use encrypted channels
                </li>
              </ul>

              <h4>2.2 Storage Security Protocols</h4>
              <ul>
                <li>
                  <strong>Infrastructure:</strong> Hosted on secure, SOC 2
                  compliant cloud infrastructure
                </li>
                <li>
                  <strong>Access Controls:</strong> Role-based access controls
                  and principle of least privilege
                </li>
                <li>
                  <strong>Monitoring:</strong> 24/7 security monitoring and
                  intrusion detection
                </li>
                <li>
                  <strong>Backups:</strong> Regular encrypted backups with
                  secure off-site storage
                </li>
                <li>
                  <strong>Data Isolation:</strong> User data is logically
                  separated and access-controlled
                </li>
              </ul>

              <h4>2.3 Authentication Safeguards</h4>
              <ul>
                <li>
                  <strong>OAuth Security:</strong> GitHub OAuth 2.0 with secure
                  token handling
                </li>
                <li>
                  <strong>Session Management:</strong> Secure session tokens
                  with appropriate expiration
                </li>
                <li>
                  <strong>CSRF Protection:</strong> Cross-site request forgery
                  protection on all forms
                </li>
                <li>
                  <strong>Rate Limiting:</strong> API rate limiting to prevent
                  abuse and DoS attacks
                </li>
              </ul>

              <h4>2.4 Beta Testing Security Considerations</h4>
              <ul>
                <li>Enhanced logging and monitoring during beta phases</li>
                <li>Additional security reviews for new features</li>
                <li>Secure feedback channels for reporting security issues</li>
                <li>Regular security assessments and penetration testing</li>
              </ul>

              <h4>2.5 Incident Response</h4>
              <p>In the event of a security breach, we will:</p>
              <ul>
                <li>Immediately assess and contain the incident</li>
                <li>Notify affected users within 72 hours</li>
                <li>Provide clear information about what data was affected</li>
                <li>Take steps to prevent similar incidents</li>
                <li>Comply with applicable breach notification regulations</li>
              </ul>
            </CardContent>
          </Card>

          {/* User Rights & Controls */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <UserCheck className="w-5 h-5" />
                3. User Rights & Controls
              </CardTitle>
            </CardHeader>
            <CardContent className="prose prose-neutral dark:prose-invert max-w-none">
              <h4>3.1 Data Access Rights</h4>
              <p>You have the right to:</p>
              <ul>
                <li>
                  <strong>Access:</strong> Request a copy of all personal data
                  we hold about you
                </li>
                <li>
                  <strong>Portability:</strong> Receive your data in a
                  structured, machine-readable format
                </li>
                <li>
                  <strong>Review:</strong> View your account information,
                  diagrams, and usage history through your dashboard
                </li>
                <li>
                  <strong>Export:</strong> Download your created diagrams in
                  various formats (PNG, SVG, etc.)
                </li>
              </ul>

              <h4>3.2 Data Correction and Deletion</h4>
              <ul>
                <li>
                  <strong>Correction:</strong> Update incorrect or incomplete
                  personal information
                </li>
                <li>
                  <strong>Deletion:</strong> Request complete deletion of your
                  account and associated data
                </li>
                <li>
                  <strong>Selective Deletion:</strong> Delete specific diagrams
                  or conversation history
                </li>
                <li>
                  <strong>Right to be Forgotten:</strong> Complete removal from
                  our systems (subject to legal requirements)
                </li>
              </ul>

              <h4>3.3 Privacy Preferences Management</h4>
              <ul>
                <li>
                  <strong>Analytics Opt-out:</strong> Disable usage analytics
                  and tracking
                </li>
                <li>
                  <strong>Communication Preferences:</strong> Control email
                  notifications and updates
                </li>
                <li>
                  <strong>Data Processing Consent:</strong> Withdraw consent for
                  non-essential processing
                </li>
                <li>
                  <strong>Third-party Sharing:</strong> Control how your data is
                  shared with service providers
                </li>
              </ul>

              <h4>3.4 Beta Tester Specific Rights</h4>
              <ul>
                <li>
                  <strong>Enhanced Data Access:</strong> Additional access to
                  beta testing data and feedback
                </li>
                <li>
                  <strong>Withdrawal Rights:</strong> Right to withdraw from
                  beta testing at any time
                </li>
                <li>
                  <strong>Data Migration:</strong> Assistance with data
                  migration when beta features become stable
                </li>
                <li>
                  <strong>Special Deletion Rights:</strong> Request deletion of
                  beta-specific data collections
                </li>
              </ul>

              <h4>3.5 Communication Opt-out Choices</h4>
              <ul>
                <li>
                  <strong>Service Updates:</strong> Opt-out of non-critical
                  service announcements
                </li>
                <li>
                  <strong>Beta Communications:</strong> Unsubscribe from beta
                  testing communications
                </li>
                <li>
                  <strong>Marketing:</strong> Opt-out of promotional emails (we
                  currently don&apos;t send marketing emails)
                </li>
                <li>
                  <strong>Support Communications:</strong> Manage support ticket
                  notifications
                </li>
              </ul>

              <h4>3.6 How to Exercise Your Rights</h4>
              <p>To exercise any of these rights:</p>
              <ul>
                <li>
                  Contact us through our{" "}
                  <Link
                    href="/support"
                    className="text-primary hover:underline"
                  >
                    support page
                  </Link>
                </li>
                <li>Use the account settings in your dashboard</li>
                <li>Email us directly at privacy@vanita.app</li>
                <li>We will respond to requests within 30 days</li>
              </ul>
            </CardContent>
          </Card>

          {/* Third-Party Services */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="w-5 h-5" />
                4. Third-Party Services
              </CardTitle>
            </CardHeader>
            <CardContent className="prose prose-neutral dark:prose-invert max-w-none">
              <h4>4.1 OpenAI API Integration</h4>
              <ul>
                <li>
                  <strong>Purpose:</strong> AI-powered diagram generation from
                  text prompts
                </li>
                <li>
                  <strong>Data Shared:</strong> Text prompts, system messages
                  for diagram generation
                </li>
                <li>
                  <strong>Data Retention:</strong> OpenAI processes requests in
                  real-time, data not permanently stored
                </li>
                <li>
                  <strong>Privacy Policy:</strong>{" "}
                  <a
                    href="https://openai.com/privacy/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                  >
                    OpenAI Privacy Policy
                  </a>
                </li>
                <li>
                  <strong>Location:</strong> Data processed in OpenAI&apos;s
                  global infrastructure
                </li>
              </ul>

              <h4>4.2 GitHub OAuth (Authentication)</h4>
              <ul>
                <li>
                  <strong>Purpose:</strong> Secure user authentication and
                  account creation
                </li>
                <li>
                  <strong>Data Shared:</strong> Public profile information,
                  email address
                </li>
                <li>
                  <strong>Data Retention:</strong> Profile data cached during
                  active sessions
                </li>
                <li>
                  <strong>Privacy Policy:</strong>{" "}
                  <a
                    href="https://docs.github.com/en/site-policy/privacy-policies/github-privacy-statement"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                  >
                    GitHub Privacy Statement
                  </a>
                </li>
                <li>
                  <strong>Location:</strong> Global GitHub infrastructure
                </li>
              </ul>

              <h4>4.3 Stripe (Payment Processing)</h4>
              <ul>
                <li>
                  <strong>Purpose:</strong> Secure payment processing for token
                  purchases
                </li>
                <li>
                  <strong>Data Shared:</strong> Customer ID, transaction
                  amounts, payment metadata
                </li>
                <li>
                  <strong>Data Retention:</strong> Payment records retained per
                  financial regulations
                </li>
                <li>
                  <strong>Privacy Policy:</strong>{" "}
                  <a
                    href="https://stripe.com/privacy"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                  >
                    Stripe Privacy Policy
                  </a>
                </li>
                <li>
                  <strong>Location:</strong> EU and US data centers (GDPR
                  compliant)
                </li>
                <li>
                  <strong>Compliance:</strong> PCI DSS Level 1 certified
                </li>
              </ul>

              <h4>4.4 Hosting and Infrastructure</h4>
              <ul>
                <li>
                  <strong>Service:</strong> Vercel (hosting), Supabase
                  (database), Redis Cloud (caching)
                </li>
                <li>
                  <strong>Purpose:</strong> Application hosting, data storage,
                  and performance optimization
                </li>
                <li>
                  <strong>Data Shared:</strong> All application data and user
                  content
                </li>
                <li>
                  <strong>Security:</strong> SOC 2 Type II compliant
                  infrastructure
                </li>
                <li>
                  <strong>Location:</strong> EU and US data centers with GDPR
                  compliance
                </li>
              </ul>

              <h4>4.5 Analytics and Monitoring</h4>
              <ul>
                <li>
                  <strong>Purpose:</strong> Application performance monitoring
                  and usage analytics
                </li>
                <li>
                  <strong>Data Collection:</strong> Anonymized usage patterns,
                  error logs, performance metrics
                </li>
                <li>
                  <strong>Retention:</strong> Analytics data retained for 12
                  months
                </li>
                <li>
                  <strong>Opt-out:</strong> You can disable analytics tracking
                  in your account settings
                </li>
              </ul>

              <h4>4.6 Beta Testing Platforms</h4>
              <ul>
                <li>
                  <strong>Internal Tools:</strong> We use internal feedback
                  collection and bug tracking
                </li>
                <li>
                  <strong>Data Sharing:</strong> Beta feedback shared only with
                  our development team
                </li>
                <li>
                  <strong>External Tools:</strong> No external beta testing
                  platforms currently used
                </li>
                <li>
                  <strong>Security:</strong> Beta data encrypted and
                  access-controlled
                </li>
              </ul>

              <h4>4.7 Third-Party Data Processing Agreements</h4>
              <p>
                All third-party service providers are bound by data processing
                agreements that ensure:
              </p>
              <ul>
                <li>GDPR and CCPA compliance</li>
                <li>Appropriate security measures</li>
                <li>Limited data usage for specified purposes only</li>
                <li>Data deletion upon contract termination</li>
                <li>Regular security audits and assessments</li>
              </ul>
            </CardContent>
          </Card>

          {/* Data Retention and Deletion */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="w-5 h-5" />
                5. Data Retention and Deletion
              </CardTitle>
            </CardHeader>
            <CardContent className="prose prose-neutral dark:prose-invert max-w-none">
              <h4>5.1 Retention Periods</h4>
              <ul>
                <li>
                  <strong>Account Data:</strong> Retained while your account is
                  active
                </li>
                <li>
                  <strong>Diagrams and Content:</strong> Retained until you
                  delete them or close your account
                </li>
                <li>
                  <strong>Usage Analytics:</strong> Anonymized data retained for
                  12 months
                </li>
                <li>
                  <strong>Payment Records:</strong> Retained for 7 years per
                  financial regulations
                </li>
                <li>
                  <strong>Support Communications:</strong> Retained for 3 years
                </li>
                <li>
                  <strong>Security Logs:</strong> Retained for 1 year
                </li>
              </ul>

              <h4>5.2 Automated Deletion</h4>
              <ul>
                <li>
                  Inactive accounts (no login for 2+ years) are flagged for
                  deletion
                </li>
                <li>Temporary data (sessions, caches) automatically expires</li>
                <li>Old analytics data is automatically purged</li>
                <li>Expired tokens and billing data are archived</li>
              </ul>

              <h4>5.3 Account Deletion Process</h4>
              <p>When you delete your account:</p>
              <ul>
                <li>Account data is immediately deactivated</li>
                <li>Personal information is deleted within 30 days</li>
                <li>Diagrams and content are permanently deleted</li>
                <li>Payment records are retained per legal requirements</li>
                <li>Anonymized analytics data may be retained</li>
              </ul>
            </CardContent>
          </Card>

          {/* International Data Transfers */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="w-5 h-5" />
                6. International Data Transfers
              </CardTitle>
            </CardHeader>
            <CardContent className="prose prose-neutral dark:prose-invert max-w-none">
              <h4>6.1 Data Processing Locations</h4>
              <p>Your data may be processed in:</p>
              <ul>
                <li>
                  <strong>European Union:</strong> Primary data processing
                  location
                </li>
                <li>
                  <strong>United States:</strong> OpenAI API processing, Stripe
                  payments
                </li>
                <li>
                  <strong>Global CDN:</strong> Content delivery for performance
                  optimization
                </li>
              </ul>

              <h4>6.2 Transfer Safeguards</h4>
              <ul>
                <li>Standard Contractual Clauses (SCCs) for EU-US transfers</li>
                <li>Adequacy decisions where applicable</li>
                <li>Binding Corporate Rules for service providers</li>
                <li>Additional security measures for sensitive data</li>
              </ul>

              <h4>6.3 Your Rights Regarding Transfers</h4>
              <ul>
                <li>Right to be informed about transfer destinations</li>
                <li>Right to object to transfers to specific countries</li>
                <li>
                  Right to request data localization (where technically
                  feasible)
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* Children's Privacy */}
          <Card>
            <CardHeader>
              <CardTitle>7. Children&apos;s Privacy</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-neutral dark:prose-invert max-w-none">
              <p>
                Vanita is not intended for use by children under 18 years of
                age. We do not knowingly collect personal information from
                children under 18. If we become aware that we have collected
                personal information from a child under 18, we will take steps
                to delete that information promptly.
              </p>
              <p>
                If you are a parent or guardian and believe your child has
                provided personal information to us, please contact us
                immediately.
              </p>
            </CardContent>
          </Card>

          {/* Changes to Privacy Policy */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings  className="w-5 h-5" />
                8. Changes to This Privacy Policy
              </CardTitle>
            </CardHeader>
            <CardContent className="prose prose-neutral dark:prose-invert max-w-none">
              <h4>8.1 Policy Updates</h4>
              <p>
                We may update this Privacy Policy from time to time. When we do:
              </p>
              <ul>
                <li>We will post the updated policy on this page</li>
                <li>We will update the &quot;Last Updated&quot; date</li>
                <li>
                  For significant changes, we will notify you via email or
                  service notification
                </li>
                <li>
                  You will have the opportunity to review changes before they
                  take effect
                </li>
              </ul>

              <h4>8.2 Notification of Changes</h4>
              <ul>
                <li>
                  <strong>Minor Changes:</strong> Posted on this page with 7
                  days notice
                </li>
                <li>
                  <strong>Material Changes:</strong> Email notification 30 days
                  in advance
                </li>
                <li>
                  <strong>Emergency Changes:</strong> Immediate notification for
                  security reasons
                </li>
              </ul>

              <h4>8.3 Your Options</h4>
              <p>
                If you disagree with changes to this Privacy Policy, you may:
              </p>
              <ul>
                <li>Contact us to discuss your concerns</li>
                <li>Adjust your privacy settings</li>
                <li>Delete your account before changes take effect</li>
              </ul>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Mail className="w-5 h-5" />
                9. Contact Information
              </CardTitle>
            </CardHeader>
            <CardContent className="prose prose-neutral dark:prose-invert max-w-none">
              <h4>9.1 Privacy Questions and Requests</h4>
              <p>
                For privacy-related questions, requests, or concerns, contact us
                at:
              </p>
              <ul>
                <li>
                  <strong>Email:</strong> privacy@vanita.app
                </li>
                <li>
                  <strong>Support Portal:</strong>{" "}
                  <Link
                    href="/support"
                    className="text-primary hover:underline"
                  >
                    vanita.app/support
                  </Link>
                </li>
                <li>
                  <strong>Response Time:</strong> We respond to privacy requests
                  within 30 days
                </li>
              </ul>

              <h4>9.2 Data Protection Officer</h4>
              <p>
                For EU residents, you can contact our Data Protection Officer
                at:
              </p>
              <ul>
                <li>
                  <strong>Email:</strong> dpo@vanita.app
                </li>
                <li>
                  <strong>Subject Line:</strong> &quot;GDPR Request&quot; or
                  &quot;Data Protection Inquiry&quot;
                </li>
              </ul>

              <h4>9.3 Regulatory Authorities</h4>
              <p>
                You have the right to lodge a complaint with a supervisory
                authority if you believe your data protection rights have been
                violated. For EU residents, you can find your local data
                protection authority at the European Data Protection Board
                website.
              </p>

              <h4>9.4 Emergency Contact</h4>
              <p>
                For urgent privacy or security issues (such as suspected data
                breaches affecting your account):
              </p>
              <ul>
                <li>
                  <strong>Email:</strong> security@vanita.app
                </li>
                <li>
                  <strong>Subject Line:</strong> &quot;URGENT - Security
                  Issue&quot;
                </li>
                <li>
                  <strong>Response Time:</strong> 24-48 hours for security
                  issues
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* Footer */}
          <div className="text-center pt-8 border-t">
            <p className="text-sm text-muted-foreground">
              We are committed to protecting your privacy and ensuring
              transparency in our data practices. If you have any questions or
              concerns, please don&apos;t hesitate to contact us.
            </p>
            <div className="mt-4 flex justify-center gap-6 text-sm">
              <Link
                href="/terms-and-conditions"
                className="text-primary hover:underline"
              >
                Terms and Conditions
              </Link>
              <Link href="/support" className="text-primary hover:underline">
                Support
              </Link>
              <Link href="/" className="text-primary hover:underline">
                Back to Home
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
