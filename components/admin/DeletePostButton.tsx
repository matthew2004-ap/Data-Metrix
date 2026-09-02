type DeletePostButtonProps = {
  action: (formData: FormData) => void | Promise<void>;
  id: string;
};

export default function DeletePostButton({ action, id }: DeletePostButtonProps) {
  return (
    <form action={action} className="inline-block">
      <input type="hidden" name="id" value={id} />
      <button
        type="submit"
        className="rounded-xl px-3 py-2 text-sm font-bold text-red-600 transition hover:bg-red-50 dark:hover:bg-red-950/30"
      >
        Delete
      </button>
    </form>
  );
}
