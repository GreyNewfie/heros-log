const createQuest = (questNum, questName) => {
    const questsContainer = document.getElementById('quests-container');

    // Quest 
    const questSheet = document.createElement('div');
    setAttributes(questSheet, {'class': 'quest-sheet', 'id': `quest-${questNum}-sheet`});
    questsContainer.append(questSheet);

    // Quest title section
    const questTitle = document.createElement('div');
    setAttributes(questTitle, {'class': 'quest-title', 'id':`quest-${questNum}-title`});

    const questTitleNum = document.createElement('h3');
    questTitleNum.append(`Quest ${questNum}`);

    const questTitleName = document.createElement('h4');
    questTitleName.append(`${questName}`);

    questTitle.append(questTitleNum, questTitleName);

    // Quest status section
    const questStatus = document.createElement('div');
    questStatus.setAttribute('class', 'quest-status');

    const questStatusSelLabel = document.createElement('label');
    questStatusSelLabel.setAttribute('for', `quest-${questNum}-status`);
    questStatusSelLabel.append('Quest Status: ');

    const questStatusSel = document.createElement('select');
    setAttributes(questStatusSel, {'id': `quest-${questNum}-status`, 'name': 'quest-status'});
    addTypeOptions(questStatusSel, {'not-started': 'Not Started', 'current-quest': 'Current Quest', 'complete': 'Complete'});

    questStatus.append(questStatusSelLabel, questStatusSel);

    // Append all elements to Quest Sheet
    questSheet.append(questTitle, questStatus);
}

const nextQuest = createQuest(1, 'The Trial');