const DATA_STEP_1 = {
    assignmentType: {
        type: 'select',
        validations: {},
        errors: {}, 
        title: 'Assignment type', 
        placeholder: 'Assignment type'
    },
    studyLevel: { 
        type: 'select', 
        validations: {}, 
        errors: {}, 
        title: 'Study level', 
        placeholder: 'Study level' 
    },
    noOfPages: { 
        type: 'text',
         validations: {}, 
         errors: {}, 
         title: 'Number of pages' ,
         placeholder: 'Number of pages' 
        },
    deadLine: { 
        type: 'select',
         validations: {},
          errors: {}, 
          title: 'Deadline' ,
          placeholder: 'Deadline' 
        },
    instructionFile: { 
        type: 'file',
         validations: {}, 
         errors: {},
         title: 'Upload additional instructions',
         placeholder: 'Upload additional instructions' 
        },
    orderInstructions: { 
        type: 'text', 
        validations: {}, 
        errors: {}, 
        title: 'Order instructions <span class="text-warning">* required</span>',
        placeholder: 'Type your instructions here. Please provide as many details as possible.' 
    },
    citationStyle: { 
        type: 'text', 
        validations: {}, 
        errors: {}, 
        title: 'Citation style',
        placeholder: 'Citation style' 
    },
    sources: { 
        type: 'text', 
        validations: {}, 
        errors: {}, 
        title: 'Sources',
        placeholder: 'Sources' 
    },
  };

  const STEP_ITEMS = [
    { label: 'Assignment details', data: DATA_STEP_1 },
    { label: 'Extra features', data: DATA_STEP_1 },
    { label: 'Checkout', data: {} }
  ];
  
  export { STEP_ITEMS }