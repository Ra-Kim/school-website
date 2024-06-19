export const AuthContainer = ({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) => {
  return (
    <div className="border-b border-b-sharon h-[50px] w-full">
      <p>{label}:</p>
      {children}
    </div>
  );
};
