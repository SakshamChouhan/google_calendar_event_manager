import * as Dialog from "@radix-ui/react-dialog";

type Event = {
  summary: string;
  start: { dateTime: string };
  end: { dateTime: string };
  description?: string;
};

interface EventDetailsModalProps {
  event: Event | null;
  isOpen: boolean;
  onClose: () => void;
}

export function EventDetailsModal({ event, isOpen, onClose }: EventDetailsModalProps) {
  if (!event) return null;

  return (
    <Dialog.Root open={isOpen} onOpenChange={onClose}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50" />
        <Dialog.Content className="fixed inset-0 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
            <Dialog.Title className="text-lg font-semibold">{event.summary}</Dialog.Title>
            <div className="mt-4">
              <p>
                <strong>Start:</strong> {new Date(event.start.dateTime).toLocaleString()}
              </p>
              <p>
                <strong>End:</strong> {new Date(event.end.dateTime).toLocaleString()}
              </p>
              {event.description && (
                <p className="mt-2">
                  <strong>Description:</strong> {event.description}
                </p>
              )}
            </div>
            <Dialog.Close asChild>
              <button className="mt-4 inline-block text-sm text-gray-500 hover:text-gray-700">Close</button>
            </Dialog.Close>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
