import Footer from "@/components/ui/shared/Footer"
import Header from "@/components/ui/shared/Header"

export default function RootLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    return (
      // <ClerkProvider>
      <div className="flex h-screen flex-col">
            <Header />
          <main className="flex-1">{children}</main>
          <Footer/>
          </div>
      // </ClerkProvider>
    )
  }
  