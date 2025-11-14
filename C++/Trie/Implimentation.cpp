#include<iostream>
using namespace std;

class Trienode{
    public:
    Trienode *child[26];
    bool isEndOfWord;
    Trienode(){
        isEndOfWord=false;
        for(int i=0;i<26;i++){
            child[i]=NULL;
        }
    }
};

class Trie{
    Trienode *root;
    public:
    Trie(){
        root=new Trienode();
    }

    //insert
    void insert(string word){
        Trienode* node=root;
        for(char ch:word){
            int i=ch-'a';
            if(node->child[i]==NULL){
                node->child[i]=new Trienode();
            }
            node=node->child[i];

        }
        node->isEndOfWord=true;
    }

    //search
    bool search(string word){

    }
};

int main(){
    Trie *dics=new Trie();
    dics->insert("apple");
    dics->insert("banana");
    dics->insert("application");
    dics->insert("bank");
    return 0;
}
