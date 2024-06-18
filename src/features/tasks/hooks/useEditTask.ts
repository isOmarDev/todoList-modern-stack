import { useCallback, useReducer, useRef } from 'react';

type ACTIONTYPE =
  | { type: 'enable-edit' }
  | { type: 'edit-task'; payload: string };

const initalState = {
  description: '',
  isEditEnabled: false,
};

function reducer(
  state: { [k in keyof typeof initalState]: (typeof initalState)[k] },
  action: ACTIONTYPE,
) {
  switch (action.type) {
    case 'enable-edit':
      return { ...state, isEditEnabled: !state.isEditEnabled };
    case 'edit-task':
      return { ...state, description: action.payload };
    default:
      return state;
  }
}

type UseEditTask = {
  initialValue: string;
};

export const useEditTask = ({ initialValue }: UseEditTask) => {
  // Edit task reducer
  const [state, dispatch] = useReducer(reducer, {
    ...initalState,
    description: initialValue,
  });

  // Edit input ref
  const inputRef = useRef<HTMLInputElement>(null);

  const isDescriptionChanged = initialValue !== state.description;

  // Change input handler
  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      dispatch({ type: 'edit-task', payload: e.target.value });
    },
    [],
  );

  // Enable/Disable Edit
  const toggleEdit = useCallback(() => {
    dispatch({ type: 'enable-edit' });
    inputRef.current?.focus();
  }, []);

  return {
    state,
    isDescriptionChanged,
    inputRef,
    toggleEdit,
    handleChange,
  };
};
