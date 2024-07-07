const ToDoList = artifacts.require("ToDoList");

contract("ToDoList", accounts => {
  let toDoListInstance;

  before(async () => {
    toDoListInstance = await ToDoList.deployed();
  });

  it("should deploy successfully", async () => {
    assert(toDoListInstance.address !== '');
  });

  it("should create a task", async () => {
    const result = await toDoListInstance.createTask('A new task');
    const taskCount = await toDoListInstance.taskCount();
    const task = await toDoListInstance.tasks(taskCount);

    assert.equal(task.id.toNumber(), taskCount.toNumber(), 'id is correct');
    assert.equal(task.content, 'A new task', 'content is correct');
    assert.equal(task.completed, false, 'completed is correct');
    assert.equal(taskCount.toNumber(), 1, 'task count is correct');

    const event = result.logs[0].args;
    assert.equal(event.id.toNumber(), taskCount.toNumber(), 'id is correct');
    assert.equal(event.content, 'A new task', 'content is correct');
    assert.equal(event.completed, false, 'completed is correct');
  });

  it("should toggle task completion", async () => {
    await toDoListInstance.toggleCompleted(1);
    const task = await toDoListInstance.tasks(1);
    assert.equal(task.completed, true, 'the task is marked as completed');
  });

  it("should revert if trying to toggle non-existing task", async () => {
    try {
      await toDoListInstance.toggleCompleted(99);
      assert.fail("The transaction should have thrown an error");
    } catch (err) {
      assert.include(err.message, "revert", "The error message should contain 'revert'");
    }
  });
});
