const createQuest = (questNum) => {
    const questsContainer = document.getElementById('quests-container');

    const questSheet = document.createElement('div');
    setAttributes(questSheet, {'id': `quest-sheet-${questNum}`, 'class': 'quest-sheet'});
    questsContainer.append(questSheet);
    console.log('createQuest working');
}

const nextQuest = createQuest(4);