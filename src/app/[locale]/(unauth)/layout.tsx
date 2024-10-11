export default function Layout(props: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  return (
    <>
      {props.children}
    </>
  );
}
