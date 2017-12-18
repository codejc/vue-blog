#!/bin/bash

# @description jcblog打包编译
# @author 764454663@qq.com

BUILD_ENV=""
BUILD_NAME="jc-blog"

ENV_CURRENT_PATH=$(cd `dirname $0`; pwd)
ENV_PROJECT_ROOT="$ENV_CURRENT_PATH"
ENV_OUTPUT_PATH="$ENV_PROJECT_ROOT/dist"
ENV_RELEASE_PATH="$ENV_PROJECT_ROOT/dist"
ENV_GIT_BRANCH=$(git rev-parse --abbrev-ref HEAD)

case ${ENV_GIT_BRANCH} in
  dev)
    BUILD_ENV="development"
    ;;
  test)
    BUILD_ENV="testing"
    ;;
  master)
    BUILD_ENV="production"
    ;;
  beta)
    BUILD_ENV="beta"
    ;;
esac

# BUILD_NAME="${BUILD_NAME}-${BUILD_ENV}"

help() {
  cat <<-EOF

  Usage:
  ./build.sh -b dev           # 开发模式 实时编译
  ./build.sh -b output        # 根据当前 Git 分支生成上线包
  ./build.sh -b testing       # 解压测试构建包
  ./build.sh -b development   # 解压开发构建包
  ./build.sh -b production    # 解压上线构建包
  ./build.sh -b beta          # 解压演示构建包
  ./build.sh -h               # 帮助

EOF
}

gecho() {
  echo -e "\033[36m$1\033[0m\n"
}

buildDev() {
  gecho "----- 开发模式 -----"

  cd $ENV_PROJECT_ROOT
  npm run dev
}

buildOutput() {
  gecho "----- 生成上线包 -----"

  cd $ENV_PROJECT_ROOT
  # npm run prod

  case ${ENV_GIT_BRANCH} in
    dev)
      npm run build:dev
      ;;
    test)
      npm run build:test
      ;;
    master)
      npm run build:prod
      ;;
  esac
}

# buildRelease() {
#   gecho "----- 解压上线包至指定目录 -----"

#   cd $ENV_OUTPUT_PATH
#   tar -zxvf $BUILD_NAME.tgz -C $ENV_RELEASE_PATH
#   rm $BUILD_NAME.tgz
# }

buildTesting() {
  gecho "----- 解压测试包至指定目录 -----"

  cd $ENV_OUTPUT_PATH
  tar -zxvf "${BUILD_NAME}-testing.tgz" -C $ENV_RELEASE_PATH
  chmod -R 755 $ENV_RELEASE_PATH/*
}

buildDevelopment() {
  gecho "----- 解压开发包至指定目录 -----"

  cd $ENV_OUTPUT_PATH
  tar -zxvf "${BUILD_NAME}-development.tgz" -C $ENV_RELEASE_PATH
  chmod -R 755 $ENV_RELEASE_PATH/*
}

buildProduction() {
  gecho "----- 解压上线包至指定目录 -----"

  cd $ENV_OUTPUT_PATH
  tar -zxvf "${BUILD_NAME}-production.tgz" -C $ENV_RELEASE_PATH
  chmod -R 755 $ENV_RELEASE_PATH/*
}

buildBeta() {
  gecho "----- 解压演示包至指定目录 -----"

  cd $ENV_OUTPUT_PATH
  tar -zxvf "${BUILD_NAME}-beta.tgz" -C $ENV_RELEASE_PATH
  chmod -R 755 $ENV_RELEASE_PATH/*
}

while getopts "hb:" opt; do
  case $opt in
    h) 
      help
      exit 0
      ;;
    b)
      BUILD_ENV=$OPTARG
      ;;
    *)
      continue
      ;;
  esac
done

case ${BUILD_ENV} in
  dev)
    buildDev
    ;;
  output)
    buildOutput
    ;;
  # release)
    # buildRelease
    # ;;
  testing)
    buildTesting
    ;;
  development)
    buildDevelopment
    ;;
  production)
    buildProduction
    ;;
  beta)
    buildBeta
    ;;
  *)
    help
    ;;
esac

exit 0
