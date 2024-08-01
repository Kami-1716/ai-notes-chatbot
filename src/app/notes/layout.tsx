import Navbar from "./Navbar";

type Props = {
  children: React.ReactNode;
};

export default function Layout({ children }: Props) {
  return (
    <>
      <Navbar />
      <main className="p-4 max-w-7xl mx-auto">{children}</main>
    </>
  );
}
