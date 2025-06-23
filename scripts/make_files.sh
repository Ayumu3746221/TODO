#!/bin/bash

if [ "$#" -lt 2 ]; then
    echo "使い方： $0 ディレクトリ名 ファイル名 [ファイル名2 ...]"
    exit 1
fi

# 引数1: ディレクトリ名
DIR_NAME=$1
shift # 残りをファイル名として扱うため、引数1を削除

# ディレクトリを作成（存在しない場合のみ）
if [ ! -d "$DIR_NAME" ]; then
    mkdir -p "$DIR_NAME"
    echo "ディレクトリ '$DIR_NAME' を作成しました。"
else
    echo "ディレクトリ '$DIR_NAME' はすでに存在します。"
fi

# ファイル作成ループ
for FILE in "$@"; do
  FILE_PATH="$DIR_NAME/$FILE"
  if [ -e "$FILE_PATH" ]; then
    echo "⚠️ ファイル '$FILE_PATH' は既に存在します。スキップします。"
  else
    touch "$FILE_PATH"
    echo "✅ ファイル '$FILE_PATH' を作成しました。"
  fi
done