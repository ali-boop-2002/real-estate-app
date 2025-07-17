import "@/assets/styles/globals.css";
export const metadata = {
  title: "Property Pulse",
  keywords: "rental, property, real estate",
  description: "Find the perfect rental property",
};
function layout({ children }) {
  return (
    <html>
      <body>
        <main>{children}</main>
      </body>
    </html>
  );
}

export default layout;
