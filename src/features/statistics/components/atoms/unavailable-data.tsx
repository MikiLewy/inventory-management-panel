interface Props {
  message: string;
}

const UnavailableData = ({ message }: Props) => {
  return (
    <div className="flex flex-col grow items-center justify-center gap-6 mt-2">
      <p className="text-sm text-muted-foreground">{message || 'No data available'}</p>
    </div>
  );
};

export default UnavailableData;
