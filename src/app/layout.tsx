@@ .. @@
 import { Geist, Geist_Mono } from "next/font/google";
 import "./globals.css";
 import { ThemeProvider } from "@/contexts/theme-context";
+import { Suspense } from "react";
 
 const geistSans = Geist({
@@ .. @@
       >
         <ThemeProvider>
-          {children}
+          <Suspense fallback={<div>Loading...</div>}>
+            {children}
+          </Suspense>
         </ThemeProvider>
       </body>
     </html>