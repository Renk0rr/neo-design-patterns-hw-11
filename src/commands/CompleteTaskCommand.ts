import { AbstractCommand } from "./AbstractCommand";
import { TaskList } from "../models/TaskList";

export class CompleteTaskCommand extends AbstractCommand {
  private previousCompleted: boolean | undefined;

  constructor(
    private taskList: TaskList,
    private taskId: string,
    private completed: boolean = true,
  ) {
    super();
  }

  execute(): void {
    const tasks = this.taskList.getAllTasks();
    const task = tasks.find((t) => t.id === this.taskId);
    if (task) {
      this.previousCompleted = task.completed;
    }
    this.taskList.completeTask(this.taskId, this.completed);
  }

  undo(): void {
    if (this.previousCompleted !== undefined) {
      this.taskList.completeTask(this.taskId, this.previousCompleted);
    }
  }
}
