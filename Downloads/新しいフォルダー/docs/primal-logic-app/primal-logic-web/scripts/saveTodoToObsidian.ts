/**
 * CursorのTODOリストをObsidianに記録するスクリプト
 * 
 * 使用方況E
 * - Cursorのターミナルで実衁E `npx tsx scripts/saveTodoToObsidian.ts`
 * - また�E、package.jsonにスクリプトを追加して実衁E
 */

import * as fs from 'fs';
import * as path from 'path';

interface TodoItem {
  id: string;
  content: string;
  status: 'pending' | 'in_progress' | 'completed' | 'cancelled';
}

/**
 * ObsidianのVaultパスを取征E
 * シンボリチE��リンクまた�E直接パスを指宁E
 */
function getObsidianVaultPath(): string {
  // プロジェクトルートから相対パスでObsidianのVaultを参照
  // シンボリチE��リンクが作�EされてぁE��場吁E ./obsidian-vault
  // また�E、絶対パスを指宁E C:\Users\susam\Documents\ObsidianVault
  
  const possiblePaths = [
    path.join(process.cwd(), 'obsidian-vault'),
    path.join(process.cwd(), '..', 'obsidian-vault'),
    'C:\\Users\\susam\\Documents\\ObsidianVault', // 実際のパスに置き換えてください
  ];

  for (const vaultPath of possiblePaths) {
    if (fs.existsSync(vaultPath)) {
      return vaultPath;
    }
  }

  throw new Error('Obsidian Vaultが見つかりません。シンボリチE��リンクを作�Eするか、パスを確認してください、E);
}

/**
 * 今日の日付をYYYY-MM-DD形式で取征E
 */
function getTodayDateString(): string {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

/**
 * TODOリストをObsidianファイルに保孁E
 */
function saveTodoToObsidian(todos: TodoItem[]): void {
  try {
    const vaultPath = getObsidianVaultPath();
    const dailyFolder = path.join(vaultPath, 'Daily');
    
    // Dailyフォルダが存在しなぁE��合�E作�E
    if (!fs.existsSync(dailyFolder)) {
      fs.mkdirSync(dailyFolder, { recursive: true });
    }

    const today = getTodayDateString();
    const filePath = path.join(dailyFolder, `${today}.md`);

    // 既存�Eファイルを読み込む�E�存在する場合！E
    let existingContent = '';
    if (fs.existsSync(filePath)) {
      existingContent = fs.readFileSync(filePath, 'utf-8');
    }

    // TODOリストをMarkdown形式で生�E
    const todoSection = `## Cursor TODOリスチE(${today})

${todos.map(todo => {
  const statusIcon = {
    pending: '- [ ]',
    in_progress: '- [~]',
    completed: '- [x]',
    cancelled: '- [ ] ~~',
  }[todo.status];

  const statusText = {
    pending: '未着扁E,
    in_progress: '進行中',
    completed: '完亁E,
    cancelled: 'キャンセル',
  }[todo.status];

  const content = todo.status === 'cancelled' 
    ? `~~${todo.content}~~` 
    : todo.content;

  return `${statusIcon} ${content} (${statusText})`;
}).join('\n')}

---

`;

    // 既存�E冁E��と結合�E�EODOセクションを更新また�E追加�E�E
    const todoSectionRegex = /## Cursor TODOリスチE*?(?=\n## |$)/s;
    let updatedContent = existingContent;

    if (todoSectionRegex.test(existingContent)) {
      // 既存�ETODOセクションを置き換ぁE
      updatedContent = existingContent.replace(todoSectionRegex, todoSection.trim());
    } else {
      // 新しいTODOセクションを追加
      updatedContent = existingContent + '\n\n' + todoSection;
    }

    // ファイルに書き込む
    fs.writeFileSync(filePath, updatedContent, 'utf-8');
    console.log(`✁ETODOリストをObsidianに保存しました: ${filePath}`);
  } catch (error) {
    console.error('❁Eエラーが発生しました:', error);
    throw error;
  }
}

/**
 * CursorのTODOリストを取征E
 * 
 * 取得方法（優先頁E��頁E��E
 * 1. コマンドライン引数からTODOリストを取得！ESON形式！E
 * 2. second-brain/logs/daily/ から最新のTODOリストを読み込む
 * 3. チE��ォルト�ETODOリスト（サンプル�E�E
 */
function getCursorTodos(): TodoItem[] {
  // 方況E: コマンドライン引数から取征E
  const args = process.argv.slice(2);
  if (args.length > 0) {
    try {
      const todosJson = args[0];
      const todos = JSON.parse(todosJson);
      if (Array.isArray(todos)) {
        return todos;
      }
    } catch (error) {
      console.warn('コマンドライン引数のパ�Eスに失敗しました。デフォルト�ETODOリストを使用します、E);
    }
  }

  // 方況E: second-brain/logs/daily/ から最新のTODOリストを読み込む
  try {
    const secondBrainPath = path.join(process.cwd(), '..', '..', 'second-brain', 'logs', 'daily');
    if (fs.existsSync(secondBrainPath)) {
      const files = fs.readdirSync(secondBrainPath)
        .filter(file => file.endsWith('.md') && file.match(/^\d{4}-\d{2}-\d{2}\.md$/))
        .sort()
        .reverse(); // 最新のファイルを�Eに
      
      if (files.length > 0) {
        const latestFile = path.join(secondBrainPath, files[0]);
        const content = fs.readFileSync(latestFile, 'utf-8');
        
        // MarkdownのTODOリストをパ�Eス�E�🔵付きのタスクを抽出�E�E
        // 形弁E "- 1. 🔵 タスク冁E��" また�E "- [ ] タスク冁E��"
        const todoRegex = /[-*]\s*(?:\[([ x~])\])?\s*(?:\d+\.\s*)?(?:🔵\s*)?(.+)/g;
        const todos: TodoItem[] = [];
        let match;
        let id = 1;
        
        while ((match = todoRegex.exec(content)) !== null) {
          const checkbox = match[1];
          const taskContent = match[2].trim();
          
          // 空のタスクめE��！EoDo�E�」�EようなプレースホルダーはスキチE�E
          if (!taskContent || taskContent === '�E�EoDo�E�E || taskContent === '(ToDo)') {
            continue;
          }
          
          let status: 'pending' | 'in_progress' | 'completed' | 'cancelled';
          if (checkbox === 'x') {
            status = 'completed';
          } else if (checkbox === '~') {
            status = 'in_progress';
          } else if (checkbox === ' ') {
            status = 'pending';
          } else {
            // 🔵付きのタスクは未完亁E��して扱ぁE
            status = 'pending';
          }
          
          todos.push({
            id: String(id++),
            content: taskContent,
            status,
          });
        }
        
        if (todos.length > 0) {
          console.log(`📝 second-brainから ${todos.length} 件のTODOを読み込みました`);
          return todos;
        }
      }
    }
  } catch (error) {
    console.warn('second-brainからのTODOリスト読み込みに失敗しました、E, error);
  }

  // 方況E: チE��ォルト�ETODOリスト（サンプル�E�E
  console.log('⚠�E�EチE��ォルト�ETODOリストを使用します、E);
  return [
    {
      id: '1',
      content: 'AIチャチE��機�Eの改喁E,
      status: 'completed',
    },
    {
      id: '2',
      content: 'Obsidian連携の実裁E,
      status: 'in_progress',
    },
    {
      id: '3',
      content: '投賁E��からの返事確誁E,
      status: 'pending',
    },
  ];
}

// メイン処琁E
if (require.main === module) {
  try {
    const todos = getCursorTodos();
    saveTodoToObsidian(todos);
  } catch (error) {
    console.error('エラー:', error);
    process.exit(1);
  }
}

export { saveTodoToObsidian, getCursorTodos, getTodayDateString };


