import { Sparkles, ScrollText, Shield, AlertTriangle } from "lucide-react";
import Link from "next/link";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";

export default function TermsAndConditionsPage() {
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
            <Sparkles className="w-5 h-5 text-primary-foreground" />
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
              <ScrollText className="w-12 h-12 text-primary" />
            </div>
            <h1 className="text-4xl font-bold tracking-tight">
              Terms and Conditions
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
              <strong>Beta Service Notice:</strong> Vanita is currently in beta testing phase. 
              Service features, availability, and terms may change without prior notice. 
              Use at your own discretion.
            </AlertDescription>
          </Alert>

          {/* Introduction */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-5 h-5" />
                Introduction
              </CardTitle>
            </CardHeader>
            <CardContent className="prose prose-neutral dark:prose-invert max-w-none">
              <p>
                Welcome to Vanita (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;), an AI-powered diagram generation 
                service. These Terms and Conditions (&quot;Terms&quot;) govern your use of our website, 
                application, and services (collectively, the &quot;Service&quot;) operated by Vanita.
              </p>
              <p>
                By accessing or using our Service, you agree to be bound by these Terms. 
                If you disagree with any part of these terms, then you may not access the Service.
              </p>
            </CardContent>
          </Card>

          {/* User Eligibility */}
          <Card>
            <CardHeader>
              <CardTitle>1. User Eligibility</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-neutral dark:prose-invert max-w-none">
              <p>You must be at least 18 years old to use our Service. By using the Service, you represent and warrant that:</p>
              <ul>
                <li>You are at least 18 years of age</li>
                <li>You have the legal capacity to enter into this agreement</li>
                <li>You will provide accurate and complete information when creating an account</li>
                <li>You will comply with all applicable laws and regulations</li>
              </ul>
            </CardContent>
          </Card>

          {/* Account Creation and Security */}
          <Card>
            <CardHeader>
              <CardTitle>2. Account Creation and Security</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-neutral dark:prose-invert max-w-none">
              <h4>2.1 Account Registration</h4>
              <p>To access certain features, you must create an account using a valid GitHub account through our OAuth integration.</p>
              
              <h4>2.2 Account Security</h4>
              <ul>
                <li>You are responsible for maintaining the security of your account</li>
                <li>You must notify us immediately of any unauthorized access</li>
                <li>We are not liable for any loss or damage from unauthorized account access</li>
                <li>You may not share your account credentials with others</li>
              </ul>

              <h4>2.3 Account Termination</h4>
              <p>You may delete your account at any time. We reserve the right to suspend or terminate accounts that violate these Terms.</p>
            </CardContent>
          </Card>

          {/* Acceptable Use Policy */}
          <Card>
            <CardHeader>
              <CardTitle>3. Acceptable Use Policy</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-neutral dark:prose-invert max-w-none">
              <p>You agree not to use the Service to:</p>
              <ul>
                <li>Generate content that is illegal, harmful, threatening, or abusive</li>
                <li>Create diagrams containing personal information of others without consent</li>
                <li>Attempt to reverse engineer, hack, or compromise our systems</li>
                <li>Use the Service for any commercial purpose without authorization</li>
                <li>Generate content that infringes on intellectual property rights</li>
                <li>Create misleading, false, or deceptive content</li>
                <li>Overload our systems or attempt to disrupt service availability</li>
                <li>Use the Service in violation of OpenAI&apos;s usage policies</li>
              </ul>
            </CardContent>
          </Card>

          {/* Service Limitations and Beta Disclaimers */}
          <Card>
            <CardHeader>
              <CardTitle>4. Service Limitations and Beta Disclaimers</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-neutral dark:prose-invert max-w-none">
              <h4>4.1 Beta Service Limitations</h4>
              <p>As a beta service, Vanita may experience:</p>
              <ul>
                <li>Temporary service interruptions or downtime</li>
                <li>Bugs, errors, or unexpected behavior</li>
                <li>Changes to features or functionality without notice</li>
                <li>Data loss or corruption (though we strive to prevent this)</li>
              </ul>

              <h4>4.2 AI-Generated Content Limitations</h4>
              <ul>
                <li>AI-generated diagrams may contain inaccuracies or errors</li>
                <li>Content is generated based on prompts and may not always meet expectations</li>
                <li>We do not guarantee the accuracy, completeness, or reliability of generated content</li>
                <li>Users should review and verify all generated content before use</li>
              </ul>

              <h4>4.3 Token-Based Usage</h4>
              <ul>
                <li>Service usage is measured in tokens based on AI processing requirements</li>
                <li>Token consumption may vary based on prompt complexity and diagram generation</li>
                <li>Purchased tokens are non-refundable and expire one year from purchase date</li>
              </ul>
            </CardContent>
          </Card>

          {/* Privacy and Data Handling */}
          <Card>
            <CardHeader>
              <CardTitle>5. Privacy and Data Handling</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-neutral dark:prose-invert max-w-none">
              <h4>5.1 Data Collection</h4>
              <p>We collect and process data as described in our Privacy Policy, including:</p>
              <ul>
                <li>Account information from GitHub OAuth</li>
                <li>Diagram prompts and generated content</li>
                <li>Usage analytics and performance data</li>
                <li>Payment information processed through Stripe</li>
              </ul>

              <h4>5.2 Data Processing</h4>
              <ul>
                <li>Your prompts are sent to OpenAI&apos;s API for diagram generation</li>
                <li>We store diagrams and conversation history for your account access</li>
                <li>We implement appropriate security measures to protect your data</li>
              </ul>

              <h4>5.3 GDPR and CCPA Compliance</h4>
              <p>We comply with applicable data protection regulations. You have rights regarding your personal data, including access, correction, and deletion requests.</p>
            </CardContent>
          </Card>

          {/* Intellectual Property Rights */}
          <Card>
            <CardHeader>
              <CardTitle>6. Intellectual Property Rights</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-neutral dark:prose-invert max-w-none">
              <h4>6.1 Service Ownership</h4>
              <p>Vanita owns all rights to the Service, including software, designs, and trademarks.</p>

              <h4>6.2 User-Generated Content</h4>
              <ul>
                <li>You retain ownership of your original prompts and inputs</li>
                <li>You grant us a license to process your prompts for service delivery</li>
                <li>AI-generated diagrams are owned by you, subject to these Terms</li>
              </ul>

              <h4>6.3 AI-Generated Content Rights</h4>
              <ul>
                <li>You may use generated diagrams for personal and commercial purposes</li>
                <li>You are responsible for ensuring generated content doesn&apos;t infringe third-party rights</li>
                <li>We make no warranties regarding the originality of AI-generated content</li>
              </ul>
            </CardContent>
          </Card>

          {/* Payment Terms */}
          <Card>
            <CardHeader>
              <CardTitle>7. Payment Terms</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-neutral dark:prose-invert max-w-none">
              <h4>7.1 Token Purchases</h4>
              <ul>
                <li>Tokens are purchased through Stripe payment processing</li>
                <li>All payments are processed securely and are non-refundable</li>
                <li>Prices are displayed in Euros and may change without notice</li>
                <li>Purchased tokens expire one year from the purchase date</li>
              </ul>

              <h4>7.2 Billing and Refunds</h4>
              <ul>
                <li>All sales are final unless required by applicable law</li>
                <li>Refunds may be provided at our sole discretion for unused tokens</li>
                <li>We reserve the right to modify pricing at any time</li>
              </ul>
            </CardContent>
          </Card>

          {/* API Usage and Technical Limitations */}
          <Card>
            <CardHeader>
              <CardTitle>8. API Usage and Technical Limitations</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-neutral dark:prose-invert max-w-none">
              <h4>8.1 OpenAI API Integration</h4>
              <ul>
                <li>Our Service relies on OpenAI&apos;s API for diagram generation</li>
                <li>Usage is subject to OpenAI&apos;s terms of service and usage policies</li>
                <li>Service availability depends on third-party API availability</li>
              </ul>

              <h4>8.2 Rate Limiting</h4>
              <ul>
                <li>We may implement rate limits to ensure fair usage</li>
                <li>Excessive usage may result in temporary service restrictions</li>
                <li>Token consumption is tracked and limited based on your account balance</li>
              </ul>
            </CardContent>
          </Card>

          {/* Beta Testing and Feedback */}
          <Card>
            <CardHeader>
              <CardTitle>9. Beta Testing and Feedback</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-neutral dark:prose-invert max-w-none">
              <h4>9.1 Beta Participation</h4>
              <p>By using our beta service, you agree to:</p>
              <ul>
                <li>Report bugs and issues through appropriate channels</li>
                <li>Provide constructive feedback when requested</li>
                <li>Understand that features may change or be removed</li>
              </ul>

              <h4>9.2 Feedback Rights</h4>
              <p>Any feedback, suggestions, or ideas you provide become our property and may be used without compensation or attribution.</p>
            </CardContent>
          </Card>

          {/* Limitation of Liability */}
          <Card>
            <CardHeader>
              <CardTitle>10. Limitation of Liability</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-neutral dark:prose-invert max-w-none">
              <p>To the maximum extent permitted by law:</p>
              <ul>
                <li>The Service is provided &quot;as is&quot; without warranties of any kind</li>
                <li>We are not liable for any indirect, incidental, or consequential damages</li>
                <li>Our total liability is limited to the amount you paid for the Service in the past 12 months</li>
                <li>We are not responsible for third-party content or services</li>
                <li>We do not warrant that the Service will be error-free or uninterrupted</li>
              </ul>
            </CardContent>
          </Card>

          {/* Termination */}
          <Card>
            <CardHeader>
              <CardTitle>11. Termination</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-neutral dark:prose-invert max-w-none">
              <h4>11.1 Termination by User</h4>
              <p>You may terminate your account at any time by contacting us or deleting your account through the Service.</p>

              <h4>11.2 Termination by Us</h4>
              <p>We may terminate or suspend your account immediately if you:</p>
              <ul>
                <li>Violate these Terms or our policies</li>
                <li>Engage in fraudulent or illegal activities</li>
                <li>Fail to pay required fees</li>
                <li>Create security risks for the Service</li>
              </ul>

              <h4>11.3 Effect of Termination</h4>
              <ul>
                <li>Access to the Service will be immediately terminated</li>
                <li>Your data may be deleted within a reasonable timeframe</li>
                <li>Unused tokens are forfeited upon termination</li>
              </ul>
            </CardContent>
          </Card>

          {/* Governing Law and Disputes */}
          <Card>
            <CardHeader>
              <CardTitle>12. Governing Law and Disputes</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-neutral dark:prose-invert max-w-none">
              <h4>12.1 Governing Law</h4>
              <p>These Terms are governed by the laws of the European Union and the jurisdiction where Vanita is incorporated.</p>

              <h4>12.2 Dispute Resolution</h4>
              <ul>
                <li>We encourage resolving disputes through direct communication</li>
                <li>If informal resolution fails, disputes will be resolved through binding arbitration</li>
                <li>You waive the right to participate in class action lawsuits</li>
              </ul>
            </CardContent>
          </Card>

          {/* Changes to Terms */}
          <Card>
            <CardHeader>
              <CardTitle>13. Changes to Terms</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-neutral dark:prose-invert max-w-none">
              <p>We reserve the right to modify these Terms at any time. Changes will be effective when posted on this page. Continued use of the Service after changes constitutes acceptance of the new Terms.</p>
              <p>For significant changes, we will provide reasonable notice through the Service or by email.</p>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <Card>
            <CardHeader>
              <CardTitle>14. Contact Information</CardTitle>
            </CardHeader>
            <CardContent className="prose prose-neutral dark:prose-invert max-w-none">
              <p>If you have questions about these Terms, please contact us:</p>
              <ul>
                <li>Email: <Link href="/support" className="text-primary hover:underline">Support</Link></li>
                <li>Website: <Link href="/" className="text-primary hover:underline">vanita.app</Link></li>
              </ul>
            </CardContent>
          </Card>

          {/* Footer */}
          <div className="text-center pt-8 border-t">
            <p className="text-sm text-muted-foreground">
              By using Vanita, you acknowledge that you have read, understood, and agree to be bound by these Terms and Conditions.
            </p>
            <div className="mt-4 flex justify-center gap-6 text-sm">
              <Link href="/privacy-policy" className="text-primary hover:underline">
                Privacy Policy
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