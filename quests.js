const createQuest = (questNum, questName) => {
    const questsContainer = document.getElementById('quests-container');

    const questSheet = document.createElement('div');
    setAttributes(questSheet, {'class': 'quest-sheet', 'id': `quest-${questNum}-sheet`});
    questsContainer.append(questSheet);

    const questTitle = document.createElement('div');
    setAttributes(questTitle, {'class': 'quest-title', 'id':`quest-${questNum}-title`});
    questSheet.append(questTitle);

    const questTitleNum = document.createElement('h3');
    questTitleNum.append(`Quest ${questNum}`);

    const questTitleName = document.createElement('h4');
    questTitleName.append(`${questName}`);

    questTitle.append(questTitleNum, questTitleName);
}

const nextQuest = createQuest(1, 'The Trial');