import React, { useState } from 'react';
import { TarefaProvider, useTarefaContext } from './TarefaContext'; // Importando o hook
import ListaDeTarefas from './ListaDeTarefas';

const App = () => {
  return (
    <TarefaProvider>
      <TarefaComponent />
    </TarefaProvider>
  );
};

const TarefaComponent = () => {
  const [novaTarefa, setNovaTarefa] = useState('');
  const [filtro, setFiltro] = useState('todas'); // Estado para o filtro
  const { state, dispatch } = useTarefaContext(); // Usando o hook para obter o dispatch

  const adicionarTarefa = () => {
    if (novaTarefa.trim()) {
      dispatch({ type: 'ADICIONAR_TAREFA', payload: novaTarefa });
      setNovaTarefa('');
    }
  };

  // Função para filtrar as tarefas
  const tarefasFiltradas = () => {
    if (filtro === 'concluidas') {
      return state.filter(tarefa => tarefa.concluida);
    } else if (filtro === 'pendentes') {
      return state.filter(tarefa => !tarefa.concluida);
    }
    return state; // Retorna todas as tarefas
  };

  return (
    <div>
      <h1>Gerenciador de Tarefas</h1>
      <input
        type="text"
        value={novaTarefa}
        onChange={(e) => setNovaTarefa(e.target.value)}
        placeholder="Digite uma nova tarefa"
      />
      <button onClick={adicionarTarefa}>Adicionar Tarefa</button>

      {/* Botões de filtragem */}
      <div>
        <button onClick={() => setFiltro('todas')}>Todas</button>
        <button onClick={() => setFiltro('concluidas')}>Concluídas</button>
        <button onClick={() => setFiltro('pendentes')}>Pendentes</button>
      </div>

      <ListaDeTarefas tarefas={tarefasFiltradas()} dispatch={dispatch} />
    </div>
  );
};

export default App;