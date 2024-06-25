interface ChatProps {
  loading: boolean;
  apiResponse: string;
}

export const Chat = ({ loading, apiResponse }: ChatProps) => {
  return (
    <>
      {loading && !apiResponse && "Generating..."}
      {apiResponse && (
        <div>
          <strong>API response:</strong>
          {apiResponse}
        </div>
      )}
    </>
  );
};
