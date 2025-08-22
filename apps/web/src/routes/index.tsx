import { createFileRoute } from "@tanstack/react-router";
import { orpc } from "@/integrations/orpc/client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const Route = createFileRoute("/")({
  component: App,
  loader: async ({ context }) => {
    await context.queryClient.prefetchQuery(
      orpc.users.list.queryOptions({
        input: {},
      })
    );
  },
});

function App() {
  const queryClient = useQueryClient();
  const { data } = useQuery(orpc.users.list.queryOptions());
  const { mutate: createUser } = useMutation(
    orpc.users.create.mutationOptions()
  );

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    createUser(
      { name, email },
      {
        onSuccess: () => {
          queryClient.invalidateQueries(orpc.users.list.queryOptions());
        },
      }
    );
  }

  return (
    <div className="space-y-12">
      <div>
        <pre>{JSON.stringify(data, null, 2)}</pre>
      </div>

      <form
        className="p-4 rounded-lg border space-y-4"
        onSubmit={handleSubmit}
        autoComplete="off"
      >
        <div className="flex flex-col space-y-2">
          <label htmlFor="name">Name</label>
          <input name="name" placeholder="John Doe" />
        </div>

        <div className="flex flex-col space-y-2">
          <label htmlFor="email">Email</label>
          <input name="email" placeholder="john.doe@example.com" />
        </div>

        <button
          type="submit"
          className="px-3 h-10 text-sm font-medium bg-black text-white rounded-md"
        >
          Create
        </button>
      </form>
    </div>
  );
}
