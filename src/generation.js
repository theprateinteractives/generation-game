function createIdHandler(totalCombinations) {
  return {
    randomId() {
      return Math.floor(Math.random() * (totalCombinations - 1));
    }
  }
}

function findTemplateForId(templates, id) {
  let pastTemplateTotal = 0;
  for(let index in templates) {
    const template = templates[index];
    if (template.combinations > (id - pastTemplateTotal)) {
      return [id - pastTemplateTotal, template];
    }

    pastTemplateTotal = pastTemplateTotal + template.combinations;
  }
}

function generateTemplateString(template, id) {
  const places = bucketFill(template.args.map(arg => arg.combinations), id);
  const result = [template.stringParts[0]];

  template.args.forEach((arg, index) => {
    result.push(arg.list[places[index]], template.stringParts[index + 1]);
  });

  return result.join('');
}

function bucketFill(bucketSizes, number) {
  const history = [];
  const result = bucketSizes.map((bucketSize, index) => {
    const leftOver = (index > 0 ? history[index - 1] : number);
    const mod = (leftOver) % bucketSize;
    history[index] = Math.floor(leftOver / bucketSize);
    return mod;
  });

  return result;
}

export default function createGeneration(templates) {
  const totalCombinations = templates.reduce((prev, template) => prev + template.combinations, 0);
  const idHandler = createIdHandler(totalCombinations);
  return {
    totalCombinations,
    generate(id = null) {
      let generationId = id;
      if (id === null) {
        generationId = idHandler.randomId();
      }

      const [templateId, template] = findTemplateForId(templates, generationId);
      
      return { output: generateTemplateString(template, templateId), id: generationId };
    }
  }
}