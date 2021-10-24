package com.example.weblab2.session;

import java.util.ArrayList;
import java.util.List;

public class RecordList {
    private List<Record> records;

    public RecordList(){
        this(new ArrayList<>());
    }


    public RecordList(List<Record> records) {
        this.records = records;
    }

    public List<Record> getRecords(){
        return records;
    }

    public void setRecords(List<Record> records) {
        this.records = records;
    }
}
