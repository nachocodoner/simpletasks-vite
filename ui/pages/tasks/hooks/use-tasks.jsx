import { useState } from 'react';
import { useUserId } from 'meteor/react-meteor-accounts';
import { useFind, useSubscribe } from 'meteor/react-meteor-data/suspense';
import { Tasks } from '/api/tasks/tasks';

export function useTasks() {
  useSubscribe('tasksByLoggedUser');
  const userId = useUserId();
  const [hideDone, setHideDone] = useState(false);
  const filter = hideDone ? { done: { $ne: true }, userId } : { userId };

  const tasks = useFind(Tasks, [filter, { sort: { createdAt: -1 } }], [hideDone]);
  const pendingCount = useFind(Tasks, [{ done: { $ne: true }, userId }]).length;

  return {
    hideDone,
    setHideDone,
    tasks,
    pendingCount,
  };
}
