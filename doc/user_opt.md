### 一、创建表结构
1.创建数据库
```

CREATE DATABASE `Thinkjs-demo` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;

```

2.创建账户表
```
CREATE TABLE accounts (
  accountId int(11) NOT NULL AUTO_INCREMENT,
  company varchar(32) NOT NULL,
  deletedAt bigint(11) unsigned NOT NULL,
  createdAt bigint(11) unsigned NOT NULL,
  updatedAt bigint(11) unsigned NOT NULL,
  PRIMARY KEY (accountId)
) ENGINE=InnoDB AUTO_INCREMENT=33 DEFAULT CHARSET=utf8;

```


3.创建用户表
```
CREATE TABLE `users` (
  `userId` int(11) NOT NULL AUTO_INCREMENT,
  `userName` varchar(32) NOT NULL,
  `userEmail` varchar(32) NOT NULL,
  `password` varchar(32) NOT NULL,
  `deletedAt` bigint(11) unsigned NOT NULL,
  `createdAt` bigint(11) unsigned NOT NULL,
  `updatedAt` bigint(11) unsigned NOT NULL,
  PRIMARY KEY (`userId`)
) ENGINE=InnoDB AUTO_INCREMENT=33 DEFAULT CHARSET=utf8;

```


### 二、实现接口
1.注册
```
URL:

method:

params:{
    userEmail:"cheng.chen@tianjishuju.com",
    userName:"chencheng",
    password:"123456",
    confirmPassword:"123456",
}
```

2.登陆
```


```

3.获取分页用户列表
```


```

4.添加用户
```


```

5.获取单个用户的编辑信息
```


```

6.更新单个用户的信息
```


```

7.删除用户信息
```


```