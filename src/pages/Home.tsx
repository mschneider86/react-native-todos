import React, { useState } from 'react';
import { StyleSheet, View, Alert } from 'react-native';

import { Header } from '../components/Header';
import { Task, TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';

export type EditTaskArgs = {
  taskId: number;
  taskNewTitle: string;
};

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
    if (newTaskTitle.trim().length > 0) {
      const taskFound = tasks.find(
        (task) =>
          task.title.trim().toLowerCase() === newTaskTitle.trim().toLowerCase()
      );

      if (!taskFound) {
        setTasks((oldTask) => [
          ...oldTask,
          {
            id: Number(new Date().getTime()),
            title: newTaskTitle,
            done: false,
          },
        ]);
      } else
        Alert.alert(
          'Task já cadastrada',
          'Você não pode cadastrar uma task com o mesmo nome.'
        );
    }
  }

  function handleToggleTaskDone(id: number) {
    const updatedTasks = tasks.map((task) => {
      if (task.id === id) {
        task.done = !task.done;
      }
      return task;
    });

    setTasks(updatedTasks);
  }

  function handleEditTask({ taskId, taskNewTitle }: EditTaskArgs) {
    const updatedTasks = tasks.map((task) => ({ ...task }));

    const taskToUpdate = updatedTasks.find((task) => task.id === taskId);

    if (!taskToUpdate) return;

    taskToUpdate.title = taskNewTitle;

    setTasks(updatedTasks);
  }

  function handleRemoveTask(id: number) {
    Alert.alert(
      'Remover item',
      'Tem certeza que você deseja remover esse item?',
      [
        { style: 'cancel', text: 'Não', onPress: () => {} },
        {
          style: 'destructive',
          text: 'Sim',
          onPress: () => {
            const filteredTasks = tasks.filter((task) => task.id !== id);

            setTasks(filteredTasks);
          },
        },
      ],
      { cancelable: false }
    );
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList
        tasks={tasks}
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask}
        editTask={handleEditTask}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBEBEB',
  },
});
