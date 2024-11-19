import React, { createContext, useReducer, useContext } from 'react';

// Criação do contexto
const TarefaContext = createContext();

// Redutor para gerenciar o estado das tarefas
const tarefaReducer = (state, action) => {
  switch (action.type) {
    case 'ADICIONAR_TAREFA':
      return [...state, { texto: action.payload, concluida: false }];
    case 'TOGGLE_TAREFA':
      return state.map((tarefa, index) =>
        index === action.payload ? { ...tarefa, concluida: !tarefa.concluida } : tarefa
      );
    default:
      return state;
  }
};

// Provedor do contexto
const TarefaProvider = ({ children }) => {
  const [state, dispatch] = useReducer(tarefaReducer, []); // Inicializando com um array vazio

  return (
    <TarefaContext.Provider value={{ state, dispatch }}>
      {children}
    </TarefaContext.Provider>
  );
};

// Hook personalizado para usar o contexto
const useTarefaContext = () => {
  return useContext(TarefaContext);
};

// Exportando o provedor e o hook
export { TarefaProvider, useTarefaContext };