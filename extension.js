
const vscode = require('vscode');

/**
 * @param {vscode.ExtensionContext} context
 */

// * * * Clog, trace console simplifiée * * *
function clog(...tb) {
    console.log(tb[0]) ;
    if (tb.length > 1) {
        console.log(tb) ;
}   }

// ===========================================================================================
//    A     CCC   TTTTT  III   OOO   N   N       DDD    EEEEE       TTTTT  RRRR   III  M   M
//   A A   C   C    T     I   O   O  NN  N       D  D   E             T    R   R   I   MM MM
//  A   A  C        T     I   O   O  N N N       D   D  EEE           T    R   R   I   M M M
//  AAAAA  C        T     I   O   O  N  NN       D   D  E             T    RRRR    I   M   M
//  A   A  C   C    T     I   O   O  N   N       D  D   E             T    R  R    I   M   M
//  A   A   CCC     T    III   OOO   N   N       DDD    EEEEE         T    R   R  III  M   M
// ===========================================================================================
// * * * Action de Trim - Retrait de tous les espaces en fin de ligne

function trim(context) {
	// * Récupération contenu *
	let zeText = vscode.window.activeTextEditor.document.getText() ;
    clog('zeText', zeText) ;
	// * Retrait blanc fin de ligne *
	zeText = zeText.replace(/\s+\n/g, "\n").replace(/\s+\r/g, "\r") ;
	clog('after', zeText) ;
	// * Remplacement du document *
	vscode.window.activeTextEditor.edit((editBuilder) => {
		const doc = vscode.window.activeTextEditor.document;  
		const startPos = new vscode.Position(0, 0); 
		const lastLine = doc.lineAt(doc.lineCount - 1); 
		const endPos = lastLine.range.end; 
		const entireRange = new vscode.Range(startPos, endPos);
		editBuilder.replace(entireRange, zeText);
	});
}

// =======================================================================================================================================
//  TTTTT  RRRR     A    III  TTTTT  EEEEE  M   M  EEEEE  N   N  TTTTT       EEEEE  X   X  TTTTT  EEEEE  N   N   SSS   III   OOO   N   N
//    T    R   R   A A    I     T    E      MM MM  E      NN  N    T         E       X X     T    E      NN  N  S       I   O   O  NN  N
//    T    R   R  A   A   I     T    EEE    M M M  EEE    N N N    T         EEE      X      T    EEE    N N N   SSS    I   O   O  N N N
//    T    RRRR   AAAAA   I     T    E      M   M  E      N  NN    T         E       X X     T    E      N  NN      S   I   O   O  N  NN
//    T    R  R   A   A   I     T    E      M   M  E      N   N    T         E      X   X    T    E      N   N      S   I   O   O  N   N
//    T    R   R  A   A  III    T    EEEEE  M   M  EEEEE  N   N    T         EEEEE  X   X    T    EEEEE  N   N  SSSS   III   OOO   N   N
// =======================================================================================================================================
// * * * Traitement Extension

function activate(context) {

	console.log('Congratulations, your extension "botrimtext" is now active!');

	let disposable = vscode.commands.registerCommand('botrimtext.trimTextAll', function () {
		vscode.window.showInformationMessage('boTrimText!');
		trim(context) ;
	});

	context.subscriptions.push(disposable);
}

function deactivate() {}

module.exports = {
	activate,
	deactivate
}
