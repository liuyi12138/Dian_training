#!/usr/bin/env python3
# -*- coding: utf-8 -*-

import os
from numpy import*
path_train_ham="./data_set/hw1_data/train/ham/"
path_train_rest="./data_set/hw1_data/train/restham/"
path_train_spam="./data_set/hw1_data/train/spam/"
path_test_ham = "./data_set/hw1_data/test/ham/"
path_test_spam = "./data_set/hw1_data/test/spam/"

def email_spilt(Strings):
    import re
    listOfTokens = re.split(r'\W*', Strings) #匹配去除符号
    return[tok.lower() for tok in listOfTokens if len(tok) > 2] #去除长度小于2的词

def word_choose(vocabSet):  #去除停用词
    with open('word.txt', 'r') as fpr:  #调用停用词表
        content = fpr.read().split('\n')
    wordSet = set(content)
    vocabSet = set(vocabSet)
    uselessSet = vocabSet & wordSet
    usefulSet = vocabSet - uselessSet
    return list(usefulSet)

def createVocabList(dataSet): #创建词汇表
    vocabSet = set([]) #创建一个空集
    for document in dataSet:
        vocabSet = vocabSet | set(document) #通过并集操作将数据传入set，并且这是一个无重复集合
    return list(vocabSet)

def bagOfword(vocabSet,inputSet,lajiwords): #vocabSet词汇表，inputSet输入文档
    returnVec=[0]*len(vocabSet) #创建0向量
    for word in inputSet:
        if word in vocabSet:
            returnVec[vocabSet.index(word)] += 1
    for word in vocabSet:
        if returnVec[vocabSet.index(word)]>10:
            returnVec[vocabSet.index(word)]*=1.2
    return returnVec #返回词汇频率信息

def get_email():
    docList_train=[]; classList_train=[];docList_test=[];classList_test=[];lajiwords=[]#docList为词汇集 classList为标签集
    for parent,dir_names,file_names in os.walk(path_train_ham):
        for file_name in file_names:
            docList_train.append(email_spilt(open(path_train_ham+file_name).read()))
            lajiwords.append(email_spilt(open(path_train_ham+file_name).read()))
            classList_train.append(1)
    for parent,dir_names,file_names in os.walk(path_train_spam):
        for file_name in file_names:
            docList_train.append(email_spilt(open(path_train_spam+file_name).read()))
            classList_train.append(0)
    for parent,dir_names,file_names in os.walk(path_test_ham):
        for file_name in file_names:
            docList_test.append(email_spilt(open(path_test_ham+file_name).read()))
            classList_test.append(1)
    for parent,dir_names,file_names in os.walk(path_test_spam):
        for file_name in file_names:
            docList_test.append(email_spilt(open(path_test_spam+file_name).read()))
            classList_test.append(0)
    return docList_train,classList_train,docList_test,classList_test,lajiwords

def train_bayes(trainMatrix,trainCategory): #trainMatrix文档矩阵 trainCategory标签向量
    numTrainDocs = len(trainMatrix)
    numWords = len(trainMatrix[0])
    pAbusive = sum(trainCategory) / float(numTrainDocs) #P(C1) P(C2)=1-P(C1)
    p0Num = ones(numWords)
    p1Num = ones(numWords)
    p0Denom=2.0 ; p1Denom=2.0
    for i in range(numTrainDocs):
        if trainCategory[i]==1:
            p1Num +=trainMatrix[i] #p1Num 词向量的向量相加
            p1Denom += sum(trainMatrix[i]) #p1Denom  标签向量相加
        else:
            p0Num += trainMatrix[i]
            p0Denom += sum(trainMatrix[i])
    p1Vest = log(p1Num/p1Denom) #P(w|1)
    p0Vest = log(p0Num/p0Denom) #P(W|0)
    return p0Vest,p1Vest,pAbusive

def judge_email(vec2Classify,p0Vec,p1Vec,pClass1):
    p1 = sum(vec2Classify * p1Vec) + log(pClass1)
    p0 = sum(vec2Classify * p0Vec) + log(1.0-pClass1)
    if p1>p0:
        return 1
    else:
        return 0

def testing_bayes():
    docList_train,classList_train,docList_test,classList_test,lajiwords=get_email()
    vocabList = createVocabList(docList_train)#词汇表vocabList
    trainMat=[]
    for postinDoc in docList_train:
        trainMat.append(bagOfword(vocabList,postinDoc,lajiwords))
    p0V,p1V,pAb=train_bayes(trainMat,classList_train)
    TP=0;FP=0;FN=0;TN=0
    for i in range(len(docList_test)):
        thisDoc = array(bagOfword(vocabList,docList_test[i]))
        myjudge=judge_email(thisDoc,p0V, p1V, pAb)
        if(classList_test[i]==1):
            if(myjudge==1):
                TP+=1
            if(myjudge==0):
                FN+=1
        if(classList_test[i]==0):
            if(myjudge==1):
                FP+=1
            if(myjudge==0):
                TN+=1
    P = TP / float(TP+FP)
    R = TP / float(TP+FN)
    print ("TP=%d,FN=%d,FP=%d,TN=%d,P=%f,R=%f" %(TP,FN,FP,TN,P,R))   




