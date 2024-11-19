import React from 'react';
import { useTarefaContext } from './TarefaContext';

const ListaDeTarefas = ({ tarefas }) => {
  const { dispatch } = useTarefaContext(); // Obtendo o dispatch do contexto

  return (
    <ul>
      {tarefas.map((tarefa, index) => (
        <li key={index}>
          <span style={{ textDecoration: tarefa.concluida ? 'line-through' : 'none' }}>
            {tarefa.texto} {/* Acesse a propriedade 'texto' do objeto tarefa */}
          </span>
          <button onClick={() => dispatch({ type: 'TOGGLE_TAREFA', payload: index })}>
            {tarefa.concluida ? 'Marcar como Pendente' : 'Marcar como Concluída'}
          </button>
        </li>
      ))}
    </ul>
  );
};

export default ListaDeTarefas;